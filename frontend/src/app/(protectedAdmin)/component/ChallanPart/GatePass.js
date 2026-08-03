import React, { useState, useRef } from 'react'
import Image from 'next/image'
import OfficeLogo from "../../../../../public/LogoImage/ashok-stambh-logo.png"

const GatePass = () => {
  const printRef = useRef(null)

  const initialForm = {
    challanNo: '',
    dated: new Date().toISOString().split('T')[0],
    officeOf: '',
    fromLocation: '',
    toLocation: '',
    passName: '',
    passDesignation: '',
    passDepartment: '',
    transportType: 'Cart',
    transportNo: '',
    purpose: '',
    items: [{ description: '', quantity: '', unit: '', remarks: '' }],
    issuedByName: '',
    issuedByDesignation: '',
    authorizedByName: '',
    authorizedByDesignation: '',
  }

  const [formData, setFormData] = useState(initialForm)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items]
    updated[index] = { ...updated[index], [field]: value }
    setFormData(prev => ({ ...prev, items: updated }))
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: '', unit: '', remarks: '' }]
    }))
  }

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }))
    }
  }

  const handleReset = () => setFormData(initialForm)

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    })
  }

  /* ───── Print Handler ───── */
  const handlePrint = () => {
    const logoUrl = window.location.origin + '/LogoImage/ashok-stambh-logo.png'

    const buildCopy = (label) => `
      <div style="padding:12px;border:2px solid #000;font-family:'Times New Roman',Times,serif;height:100%;box-sizing:border-box;">
        <div style="text-align:center;border-bottom:2.5px solid #000;padding-bottom:6px;margin-bottom:8px;">
          <table style="margin:0 auto;"><tr>
            <td style="vertical-align:middle;padding-right:10px;"><img src="${logoUrl}" width="52" height="52"/></td>
            <td style="vertical-align:middle;text-align:center;">
              <div style="font-size:12px;font-weight:600;">GOVERNMENT OF WEST BENGAL</div>
              <div style="font-size:20px;font-weight:700;letter-spacing:3px;margin:2px 0;">GATE PASS</div>
              <div style="font-size:11px;font-weight:600;">Public Works Department</div>
              <div style="font-size:9px;color:#555;">Kolkata IT Division, Writers' Building, Kolkata - 700 001</div>
            </td>
          </tr></table>
        </div>
        <div style="text-align:center;margin-bottom:8px;">
          <span style="font-size:10px;font-weight:700;letter-spacing:1.5px;padding:2px 10px;border:1.5px solid #000;">${label}</span>
        </div>
        <table style="width:100%;font-size:11px;border-collapse:collapse;">
          <tr><td style="font-weight:600;padding:3px 0;width:145px;">Challan Invoice No.:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.challanNo || '—'}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">Dated:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formatDate(formData.dated)}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">Office of the:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.officeOf || '—'}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">From:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.fromLocation || '—'}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">To:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.toLocation || '—'}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">Pass (Name):</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.passName || '—'}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">Designation:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.passDesignation || '—'}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">Department:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.passDepartment || '—'}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;">With Cart/Lorry/Cooly:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.transportType}${formData.transportNo ? ' ( ' + formData.transportNo + ' )' : ''}</td></tr>
          <tr><td style="font-weight:600;padding:3px 0;vertical-align:top;">Purpose:</td><td style="border-bottom:1px dotted #333;padding:3px 4px;">${formData.purpose || '—'}</td></tr>
        </table>
        <div style="margin:8px 0 4px;">
          <div style="font-size:11px;font-weight:600;margin-bottom:4px;">Description of Articles / Items:</div>
          <table style="width:100%;border-collapse:collapse;font-size:10px;">
            <thead>
              <tr>
                <th style="border:1px solid #333;padding:3px 5px;background:#e0e0e0;width:24px;">Sl.</th>
                <th style="border:1px solid #333;padding:3px 5px;background:#e0e0e0;">Description</th>
                <th style="border:1px solid #333;padding:3px 5px;background:#e0e0e0;width:38px;">Qty</th>
                <th style="border:1px solid #333;padding:3px 5px;background:#e0e0e0;width:38px;">Unit</th>
                <th style="border:1px solid #333;padding:3px 5px;background:#e0e0e0;">Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${formData.items.map((item, i) => `<tr>
                <td style="border:1px solid #333;padding:3px 5px;text-align:center;">${i + 1}</td>
                <td style="border:1px solid #333;padding:3px 5px;">${item.description || '—'}</td>
                <td style="border:1px solid #333;padding:3px 5px;text-align:center;">${item.quantity || '—'}</td>
                <td style="border:1px solid #333;padding:3px 5px;text-align:center;">${item.unit || '—'}</td>
                <td style="border:1px solid #333;padding:3px 5px;">${item.remarks || '—'}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <table style="width:100%;margin-top:25px;font-size:10px;">
          <tr>
            <td style="width:45%;text-align:center;vertical-align:bottom;">
              <div style="border-top:1px solid #000;margin-top:35px;padding-top:3px;">
                <div style="font-weight:600;">${formData.issuedByName || '&nbsp;'}</div>
                <div>${formData.issuedByDesignation || 'Issuing Authority'}</div>
              </div>
            </td>
            <td style="width:10%;"></td>
            <td style="width:45%;text-align:center;vertical-align:bottom;">
              <div style="border-top:1px solid #000;margin-top:35px;padding-top:3px;">
                <div style="font-weight:600;">${formData.authorizedByName || '&nbsp;'}</div>
                <div>${formData.authorizedByDesignation || 'Authorized Signatory'}</div>
              </div>
            </td>
          </tr>
        </table>
        <div style="text-align:center;font-size:8px;margin-top:8px;border-top:1px solid #ccc;padding-top:4px;color:#666;">
          This gate pass is valid for the date of issue only.
        </div>
      </div>`

    const pw = window.open('', '_blank', 'width=1100,height=750')
    pw.document.write(`<!DOCTYPE html><html><head><title>Gate Pass${formData.challanNo ? ' - ' + formData.challanNo : ''}</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'Times New Roman',Times,serif;padding:5mm;}
        .wrap{display:flex;width:100%;height:100%;}
        .copy-wrap{flex:1;}
        .sep{width:2px;background:repeating-linear-gradient(to bottom,#000 0,#000 6px,transparent 6px,transparent 12px);}
        @page{size:A4 landscape;margin:8mm;}
        @media print{body{padding:0;}}
      </style>
    </head><body onload="setTimeout(function(){window.print();},600);">
      <div class="wrap">
        <div class="copy-wrap">${buildCopy('OFFICE COPY')}</div>
        <div class="sep"></div>
        <div class="copy-wrap">${buildCopy('GATE COPY')}</div>
      </div>
    </body></html>`)
    pw.document.close()
  }

  /* ───── Reusable Styles ───── */
  const inputStyle = {
    width: '100%', padding: '7px 10px', border: '1px solid #cbd5e1',
    borderRadius: '4px', fontSize: '13px', outline: 'none',
    transition: 'border-color 0.2s', fontFamily: 'inherit'
  }

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: '600',
    marginBottom: '4px', color: '#334155'
  }

  const sectionTitle = {
    fontSize: '13px', fontWeight: '700', color: '#1e3a5f',
    borderBottom: '2px solid #1e3a5f', paddingBottom: '5px',
    marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase'
  }

  /* ───── Preview Template ───── */
  const PreviewCopy = ({ copyLabel }) => (
    <div style={{
      padding: '10px', border: '2px solid #000',
      fontFamily: "'Times New Roman', Times, serif",
      backgroundColor: '#fff', height: '100%', boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '2.5px solid #000', paddingBottom: '6px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <Image src={OfficeLogo} alt="WB Logo" width={50} height={50} style={{ objectFit: 'contain' }} />
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>GOVERNMENT OF WEST BENGAL</div>
            <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '3px', margin: '2px 0' }}>GATE PASS</div>
            <div style={{ fontSize: '11px', fontWeight: '600' }}>Public Works Department</div>
            <div style={{ fontSize: '8px', color: '#555' }}>Kolkata IT Division, Writers' Building, Kolkata - 700 001</div>
          </div>
        </div>
      </div>

      {/* Copy Label */}
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <span style={{
          fontSize: '9px', fontWeight: '700', letterSpacing: '1.5px',
          padding: '2px 10px', border: '1.5px solid #000'
        }}>{copyLabel}</span>
      </div>

      {/* Field Rows */}
      <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
        <tbody>
          {[
            ['Challan Invoice No.:', formData.challanNo],
            ['Dated:', formatDate(formData.dated)],
            ['Office of the:', formData.officeOf],
            ['From:', formData.fromLocation],
            ['To:', formData.toLocation],
            ['Pass (Name):', formData.passName],
            ['Designation:', formData.passDesignation],
            ['Department:', formData.passDepartment],
            ['With Cart/Lorry/Cooly:', `${formData.transportType}${formData.transportNo ? ' ( ' + formData.transportNo + ' )' : ''}`],
          ].map(([label, value], i) => (
            <tr key={i}>
              <td style={{ fontWeight: '600', padding: '2px 0', width: '140px', verticalAlign: 'top' }}>{label}</td>
              <td style={{ borderBottom: '1px dotted #999', padding: '2px 4px' }}>{value || '—'}</td>
            </tr>
          ))}
          <tr>
            <td style={{ fontWeight: '600', padding: '2px 0', verticalAlign: 'top' }}>Purpose:</td>
            <td style={{ borderBottom: '1px dotted #999', padding: '2px 4px', whiteSpace: 'pre-wrap' }}>{formData.purpose || '—'}</td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <div style={{ margin: '6px 0 4px' }}>
        <div style={{ fontSize: '10px', fontWeight: '600', marginBottom: '3px' }}>Description of Articles / Items:</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
          <thead>
            <tr>
              <th style={itemsTh}>Sl.</th>
              <th style={{ ...itemsTh, textAlign: 'left' }}>Description</th>
              <th style={itemsTh}>Qty</th>
              <th style={itemsTh}>Unit</th>
              <th style={{ ...itemsTh, textAlign: 'left' }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, i) => (
              <tr key={i}>
                <td style={{ ...itemsTd, textAlign: 'center' }}>{i + 1}</td>
                <td style={itemsTd}>{item.description || '—'}</td>
                <td style={{ ...itemsTd, textAlign: 'center' }}>{item.quantity || '—'}</td>
                <td style={{ ...itemsTd, textAlign: 'center' }}>{item.unit || '—'}</td>
                <td style={itemsTd}>{item.remarks || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signatures */}
      <table style={{ width: '100%', marginTop: '20px', fontSize: '10px' }}>
        <tbody>
          <tr>
            <td style={{ width: '45%', textAlign: 'center', verticalAlign: 'bottom' }}>
              <div style={{ borderTop: '1px solid #000', marginTop: '30px', paddingTop: '3px' }}>
                <div style={{ fontWeight: '600' }}>{formData.issuedByName || '\u00A0'}</div>
                <div>{formData.issuedByDesignation || 'Issuing Authority'}</div>
              </div>
            </td>
            <td style={{ width: '10%' }}></td>
            <td style={{ width: '45%', textAlign: 'center', verticalAlign: 'bottom' }}>
              <div style={{ borderTop: '1px solid #000', marginTop: '30px', paddingTop: '3px' }}>
                <div style={{ fontWeight: '600' }}>{formData.authorizedByName || '\u00A0'}</div>
                <div>{formData.authorizedByDesignation || 'Authorized Signatory'}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div style={{
        textAlign: 'center', fontSize: '7px', marginTop: '6px',
        borderTop: '1px solid #ccc', paddingTop: '3px', color: '#666'
      }}>
        This gate pass is valid for the date of issue only.
      </div>
    </div>
  )

  const itemsTh = { border: '1px solid #333', padding: '2px 4px', background: '#e0e0e0', textAlign: 'center', fontWeight: '600' }
  const itemsTd = { border: '1px solid #333', padding: '2px 4px' }

  /* ══════════════════════════════════════════════ */
  /* ───── MAIN RENDER ───── */
  /* ══════════════════════════════════════════════ */
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>

      {/* ═══ LEFT: FORM ═══ */}
      <div style={{
        width: '400px', minWidth: '400px', padding: '20px',
        overflowY: 'auto', backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0', boxShadow: '2px 0 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{
          textAlign: 'center', marginBottom: '20px',
          borderBottom: '3px solid #1e3a5f', paddingBottom: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Image src={OfficeLogo} alt="Logo" width={40} height={40} style={{ objectFit: 'contain' }} />
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a5f', letterSpacing: '1px' }}>GATE PASS</div>
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Public Works Department — Govt. of West Bengal</div>
        </div>

        {/* Section 1: Document Details */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionTitle}>Document Details</div>
          <div style={{ marginBottom: '10px' }}>
            <label style={labelStyle}>Challan Invoice No.</label>
            <input type="text" name="challanNo" value={formData.challanNo} onChange={handleChange}
              placeholder="e.g. PWD/KOL/2025/001" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Dated</label>
            <input type="date" name="dated" value={formData.dated} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        {/* Section 2: Office Details */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionTitle}>Office Details</div>
          <div style={{ marginBottom: '10px' }}>
            <label style={labelStyle}>Office of the</label>
            <input type="text" name="officeOf" value={formData.officeOf} onChange={handleChange}
              placeholder="e.g. Executive Engineer, PWD" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1, marginBottom: '10px' }}>
              <label style={labelStyle}>From</label>
              <input type="text" name="fromLocation" value={formData.fromLocation} onChange={handleChange}
                placeholder="Origin" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>To</label>
              <input type="text" name="toLocation" value={formData.toLocation} onChange={handleChange}
                placeholder="Destination" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Section 3: Pass Holder */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionTitle}>Pass Holder Information</div>
          <div style={{ marginBottom: '10px' }}>
            <label style={labelStyle}>Name</label>
            <input type="text" name="passName" value={formData.passName} onChange={handleChange}
              placeholder="Full name of the person" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1, marginBottom: '10px' }}>
              <label style={labelStyle}>Designation</label>
              <input type="text" name="passDesignation" value={formData.passDesignation} onChange={handleChange}
                placeholder="Designation" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Department</label>
              <input type="text" name="passDepartment" value={formData.passDepartment} onChange={handleChange}
                placeholder="Department" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Section 4: Transport */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionTitle}>Transport Details</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1, marginBottom: '10px' }}>
              <label style={labelStyle}>Type</label>
              <select name="transportType" value={formData.transportType} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="Cart">Cart</option>
                <option value="Lorry">Lorry</option>
                <option value="Cooly">Cooly</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Vehicle / Reg. No.</label>
              <input type="text" name="transportNo" value={formData.transportNo} onChange={handleChange}
                placeholder="e.g. WB-01-AB-1234" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Section 5: Purpose */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionTitle}>Purpose</div>
          <textarea name="purpose" value={formData.purpose} onChange={handleChange}
            placeholder="Reason for gate pass..."
            rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        {/* Section 6: Items */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ ...sectionTitle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Articles / Items</span>
            <button onClick={addItem} style={{
              fontSize: '11px', padding: '3px 10px', border: '1px solid #1e3a5f',
              borderRadius: '3px', background: '#1e3a5f', color: '#fff',
              cursor: 'pointer', fontWeight: '600'
            }}>+ Add Row</button>
          </div>
          {formData.items.map((item, index) => (
            <div key={index} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: '5px', padding: '10px', marginBottom: '8px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: '6px', right: '6px',
                fontSize: '10px', fontWeight: '700', color: '#94a3b8'
              }}>#{index + 1}</div>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ ...labelStyle, fontSize: '11px' }}>Description</label>
                <input type="text" value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Item description" style={{ ...inputStyle, fontSize: '12px' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ ...labelStyle, fontSize: '11px' }}>Qty</label>
                  <input type="text" value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    placeholder="0" style={{ ...inputStyle, fontSize: '12px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ ...labelStyle, fontSize: '11px' }}>Unit</label>
                  <select value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    style={{ ...inputStyle, fontSize: '12px', cursor: 'pointer' }}>
                    <option value="">—</option>
                    <option value="Nos">Nos</option>
                    <option value="Kgs">Kgs</option>
                    <option value="Ltrs">Ltrs</option>
                    <option value="Mtrs">Mtrs</option>
                    <option value="Box">Box</option>
                    <option value="Bundle">Bundle</option>
                    <option value="Set">Set</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ ...labelStyle, fontSize: '11px' }}>Remarks</label>
                  <input type="text" value={item.remarks}
                    onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                    placeholder="—" style={{ ...inputStyle, fontSize: '12px' }} />
                </div>
              </div>
              {formData.items.length > 1 && (
                <button onClick={() => removeItem(index)} style={{
                  marginTop: '6px', fontSize: '10px', color: '#dc2626',
                  background: 'none', border: '1px solid #fecaca',
                  borderRadius: '3px', padding: '2px 8px', cursor: 'pointer'
                }}>✕ Remove</button>
              )}
            </div>
          ))}
        </div>

        {/* Section 7: Authorization */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionTitle}>Authorization</div>
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: '5px', padding: '10px', marginBottom: '8px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Issued By</div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Name</label>
              <input type="text" name="issuedByName" value={formData.issuedByName} onChange={handleChange}
                placeholder="Issuing officer name" style={{ ...inputStyle, fontSize: '12px' }} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Designation</label>
              <input type="text" name="issuedByDesignation" value={formData.issuedByDesignation} onChange={handleChange}
                placeholder="e.g. Store Keeper" style={{ ...inputStyle, fontSize: '12px' }} />
            </div>
          </div>
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: '5px', padding: '10px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Authorized By</div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Name</label>
              <input type="text" name="authorizedByName" value={formData.authorizedByName} onChange={handleChange}
                placeholder="Authorizing officer name" style={{ ...inputStyle, fontSize: '12px' }} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Designation</label>
              <input type="text" name="authorizedByDesignation" value={formData.authorizedByDesignation} onChange={handleChange}
                placeholder="e.g. Executive Engineer" style={{ ...inputStyle, fontSize: '12px' }} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handlePrint} style={{
            flex: 1, padding: '10px', background: '#1e3a5f', color: '#fff',
            border: 'none', borderRadius: '5px', fontSize: '13px',
            fontWeight: '600', cursor: 'pointer', letterSpacing: '0.5px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}>
            🖨️ Print Gate Pass
          </button>
          <button onClick={handleReset} style={{
            padding: '10px 16px', background: '#fff', color: '#64748b',
            border: '1px solid #cbd5e1', borderRadius: '5px', fontSize: '13px',
            fontWeight: '600', cursor: 'pointer'
          }}>
            Reset
          </button>
        </div>
      </div>

      {/* ═══ RIGHT: PREVIEW ═══ */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Live Preview</h3>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8' }}>Two copies will be printed side by side</p>
          </div>
          <button onClick={handlePrint} style={{
            padding: '8px 18px', background: '#1e3a5f', color: '#fff',
            border: 'none', borderRadius: '5px', fontSize: '12px',
            fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '5px'
          }}>
            🖨️ Print
          </button>
        </div>

        {/* Two Copies Side by Side */}
        <div ref={printRef} style={{ display: 'flex', gap: '0' }}>
          <div style={{ flex: 1 }}>
            <PreviewCopy copyLabel="OFFICE COPY" />
          </div>
          <div style={{
            width: '2px',
            background: 'repeating-linear-gradient(to bottom, #000 0, #000 6px, transparent 6px, transparent 12px)',
            margin: '0 2px'
          }}></div>
          <div style={{ flex: 1 }}>
            <PreviewCopy copyLabel="GATE COPY" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GatePass
