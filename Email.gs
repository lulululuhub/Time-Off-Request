// ─────────────────────────────────────────────────────────────────
// Email.gs  —  UIC PTO Tracker
// All notification emails sent from here.
// ─────────────────────────────────────────────────────────────────

// Called when an employee submits a new request.
// Sends actionable HTML email to manager + plain copy to all admins.
function sendRequestNotification(req) {
  var appUrl   = ScriptApp.getService().getUrl();
  var token    = makeToken(req.id);
  var approveUrl = appUrl + '?action=approve&requestId=' + req.id + '&token=' + token;
  var denyUrl    = appUrl + '?action=deny&requestId='    + req.id + '&token=' + token;

  var subject = 'PTO Request - ' + req.employeeName + ' (' + req.hours + 'h) needs your approval';

  var html = buildRequestEmail(req, approveUrl, denyUrl);

  // Email to assigned manager
  if (req.managerEmail) {
    GmailApp.sendEmail(req.managerEmail, subject, getPlainText(req), { htmlBody: html });
  }

  // CC copy to all admins (skip if admin IS the manager)
  var admins = getAllEmployees().filter(function(e) {
    return e.role === 'Admin' && e.email !== req.managerEmail;
  });
  admins.forEach(function(a) {
    GmailApp.sendEmail(a.email, '[Admin copy] ' + subject, getPlainText(req), { htmlBody: html });
  });
}

// Called when a request status changes — sends result email to the employee.
function sendStatusNotification(req) {
  var approved   = req.status === 'Approved';
  var cancelled  = req.status === 'Cancelled';
  var subject;
  if (approved)        subject = 'Your PTO request has been approved';
  else if (cancelled)  subject = 'Your time-off request has been cancelled';
  else                 subject = 'Your PTO request was not approved';
  var html = buildStatusEmail(req, approved, cancelled);
  GmailApp.sendEmail(req.employeeEmail, subject, '', { htmlBody: html });
}

// ─── EMAIL BUILDERS ───────────────────────────────────────────────

function buildRequestEmail(req, approveUrl, denyUrl) {
  var headerColor = '#2d6a22';
  var initials    = req.employeeName.split(' ').map(function(p) { return p[0]; }).join('').toUpperCase();

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5f4f0;font-family:Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f0;padding:24px 0;">'
    + '<tr><td align="center">'
    + '<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0deda;">'

    // Header
    + '<tr><td style="background:' + headerColor + ';padding:20px 24px;">'
    + '<table cellpadding="0" cellspacing="0"><tr>'
    + '<td style="width:44px;height:44px;background:rgba(255,255,255,0.25);border-radius:50%;text-align:center;vertical-align:middle;font-size:15px;font-weight:bold;color:#ffffff;">' + initials + '</td>'
    + '<td style="padding-left:12px;">'
    + '<div style="color:#ffffff;font-size:16px;font-weight:bold;">PTO Request — Action Required</div>'
    + '<div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:2px;">UIC Time Off Management</div>'
    + '</td></tr></table>'
    + '</td></tr>'

    // Body
    + '<tr><td style="padding:24px;">'
    + '<p style="margin:0 0 6px;font-size:14px;color:#1a1a18;">Hi <strong>' + getManagerFirstName(req.managerEmail) + '</strong>,</p>'
    + '<p style="margin:0 0 20px;font-size:13px;color:#7a7874;">' + req.employeeName + ' has submitted a time-off request that requires your approval.</p>'

    // Details table
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f1;border-radius:8px;padding:14px 16px;margin-bottom:20px;font-size:13px;">'
    + detailRow('Employee',  req.employeeName)
    + detailRow('Type',      req.type)
    + detailRow('Dates',     req.startDate + ' to ' + req.endDate)
    + detailRow('Hours',     req.hours + 'h')
    + detailRow('Reason',    req.reason || 'Not specified')
    + detailRow('Submitted', new Date(req.createdAt).toLocaleString())
    + '</table>'

    // Buttons
    + '<p style="font-size:13px;color:#7a7874;margin:0 0 14px;">Please approve or deny this request:</p>'
    + '<table cellpadding="0" cellspacing="0"><tr>'
    + '<td style="padding-right:10px;">'
    + '<a href="' + approveUrl + '" style="display:inline-block;background:#2d6a22;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 28px;border-radius:8px;">Approve</a>'
    + '</td>'
    + '<td>'
    + '<a href="' + denyUrl + '" style="display:inline-block;background:#fdf0ef;color:#c0392b;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 28px;border-radius:8px;border:1px solid #f5c6c6;">Deny</a>'
    + '</td>'
    + '</tr></table>'

    // Footer note
    + '<p style="margin:20px 0 0;font-size:11px;color:#7a7874;border-top:1px solid #e0deda;padding-top:14px;">'
    + 'Clicking Approve or Deny updates the system instantly and notifies ' + req.employeeName + ' automatically.<br>'
    + 'Or log in to the <a href="' + ScriptApp.getService().getUrl() + '" style="color:#2d6a22;">PTO portal</a> to manage all requests.'
    + '</p>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

function buildStatusEmail(req, approved, cancelled) {
  var headerColor, headerLabel, icon, greeting, bodyMsg, footerMsg;
  var portalUrl = ScriptApp.getService().getUrl();

  if (approved) {
    headerColor = '#1e7e34';
    headerLabel = 'Request Approved';
    icon        = '&#10003;';
    greeting    = 'Hi <strong>' + req.employeeName.split(' ')[0] + '</strong>, enjoy your time off!';
    bodyMsg     = 'Your time-off request has been <strong style="color:#1e7e34;">approved</strong>.';
    footerMsg   = 'Your updated balance is visible in the <a href="' + portalUrl + '" style="color:#2d6a22;">PTO portal</a>.';
  } else if (cancelled) {
    headerColor = '#7a7874';
    headerLabel = 'Request Cancelled';
    icon        = '&#10007;';
    greeting    = 'Hi <strong>' + req.employeeName.split(' ')[0] + '</strong>,';
    bodyMsg     = 'Your time-off request has been <strong style="color:#7a7874;">cancelled</strong>.';
    footerMsg   = 'Your PTO balance has not been affected. You can <a href="' + portalUrl + '" style="color:#2d6a22;">submit a new request</a> anytime.';
  } else {
    headerColor = '#c0392b';
    headerLabel = 'Request Not Approved';
    icon        = '&#10007;';
    greeting    = 'Hi <strong>' + req.employeeName.split(' ')[0] + '</strong>,';
    bodyMsg     = 'Your time-off request has been <strong style="color:#c0392b;">denied</strong>.';
    footerMsg   = 'Your PTO balance has not been affected. You can <a href="' + portalUrl + '" style="color:#2d6a22;">submit a new request</a> with different dates.';
  }

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5f4f0;font-family:Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f0;padding:24px 0;">'
    + '<tr><td align="center">'
    + '<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0deda;">'
    // Header
    + '<tr><td style="background:' + headerColor + ';padding:20px 24px;">'
    + '<table cellpadding="0" cellspacing="0"><tr>'
    + '<td style="width:44px;height:44px;background:rgba(255,255,255,0.25);border-radius:50%;text-align:center;vertical-align:middle;font-size:22px;color:#ffffff;">' + icon + '</td>'
    + '<td style="padding-left:12px;">'
    + '<div style="color:#ffffff;font-size:16px;font-weight:bold;">' + headerLabel + '</div>'
    + '<div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:2px;">UIC Time Off Management</div>'
    + '</td></tr></table>'
    + '</td></tr>'
    // Body
    + '<tr><td style="padding:24px;">'
    + '<p style="margin:0 0 6px;font-size:14px;color:#1a1a18;">' + greeting + '</p>'
    + '<p style="margin:0 0 20px;font-size:13px;color:#7a7874;">' + bodyMsg + '</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f1;border-radius:8px;padding:14px 16px;margin-bottom:20px;font-size:13px;">'
    + detailRow('Type',   req.type)
    + detailRow('Dates',  req.startDate + ' to ' + req.endDate)
    + detailRow('Hours',  req.hours + 'h')
    + detailRow('Status', req.status)
    + '</table>'
    + '<p style="font-size:13px;color:#7a7874;margin:0;">' + footerMsg + '</p>'
    + '</td></tr></table>'
    + '</td></tr></table>'
    + '</body></html>';
}

// ─── HELPERS ──────────────────────────────────────────────────────

function detailRow(label, value) {
  return '<tr>'
    + '<td style="color:#7a7874;padding:4px 0;width:120px;vertical-align:top;">' + label + '</td>'
    + '<td style="color:#1a1a18;padding:4px 0;font-weight:500;">' + (value || '—') + '</td>'
    + '</tr>';
}

function getManagerFirstName(managerEmail) {
  try {
    var emps = getAllEmployees();
    var mgr  = emps.filter(function(e) { return e.email === managerEmail; })[0];
    return mgr ? mgr.name.split(' ')[0] : 'Manager';
  } catch (e) {
    return 'Manager';
  }
}

function getPlainText(req) {
  return 'PTO Request from ' + req.employeeName + '\n'
    + 'Type: ' + req.type + '\n'
    + 'Dates: ' + req.startDate + ' to ' + req.endDate + '\n'
    + 'Hours: ' + req.hours + '\n'
    + 'Reason: ' + (req.reason || 'Not specified') + '\n\n'
    + 'Log in to the PTO portal to approve or deny this request.';
}
