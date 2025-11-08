import React, { useState } from 'react'
import { Lead } from '../types'
import { checkNationalRegistry, checkJudicialRecord, qualificationScore } from '../mocks/mockServices'

type Props = {
  lead: Lead
  onConverted: (lead: Lead) => void
}

const LeadCard: React.FC<Props> = ({ lead, onConverted }) => {
  const [loading, setLoading] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)

  const runValidations = async (): Promise<void> => {
    setLoading(true)
    setLog([])
    setResult(null)

    // start 1 & 2 in parallel
    const p1 = checkNationalRegistry(lead.nationalId)
    const p2 = checkJudicialRecord(lead.nationalId)

    setLog(prev => [...prev, 'Validating national and judicial data...'])

    const [r1, r2] = await Promise.all([p1, p2])
    setLog(prev => [
      ...prev,
      `National: ${r1.ok ? `SUCCESS: ${r1.details}` : `FAIL: ${r1.details}`}`,
      `Judicial: ${r2.ok ? `SUCCESS: ${r2.details}` : `FAIL: ${r2.details}`}`
    ])

    if (!r1.ok || !r2.ok) {
      setResult('Checks did not pass.')
      setLoading(false)
      return
    }

    setLog(prev => [...prev, 'Running internal qualification...'])
    const qualification = await qualificationScore({
      national: r1,
      judicial: r2,
      nationalId: lead.nationalId
    })
    setLog(prev => [...prev, `Qualification score: ${qualification.score}`])

    if (qualification.score > 60) {
      setResult('Converted to Prospect')
      onConverted(lead)
    } else {
      setResult('Not eligible (score <= 60)')
    }

    setLoading(false)
  }

  return (
    <div className="card">
      <strong>{lead.name}</strong>
      <div>ID: {lead.nationalId}</div>
      <button onClick={runValidations} disabled={loading}>
        {loading ? 'Validating...' : 'Validate'}
      </button>
      {log.length > 0 && (
        <div className="log">
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      )}
      {result && <div className="result">{result}</div>}
    </div>
  )
}

export default LeadCard
