import { useState } from 'react'
import { Lead } from './types'
import LeadCard from './components/LeadCard'

const initialLeads: Lead[] = [
  { id: '1', name: 'María Gomez', nationalId: '18372911' },
  { id: '2', name: 'Juan Perez', nationalId: '90236422' }, 
  { id: '3', name: 'Ana Rodriguez', nationalId: '55789133' },
  { id: '4', name: 'Carlos Herrera', nationalId: '76128444' },
  { id: '5', name: 'Laura Torres', nationalId: '42815955' },
  { id: '6', name: 'Sofía Mendoza', nationalId: '61573066' }
]

const App = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [prospects, setProspects] = useState<Lead[]>([])

  const moveToProspect = (lead: Lead) => {
    setLeads(prev => prev.filter(l => l.id !== lead.id))
    setProspects(prev => [lead, ...prev])
  }

  return (
    <div className="app">
      <header className="header" >
        <img src="/crm-logo.png" alt="CRM Pipeline logo" />
      </header>
      <div className="pipeline">
        <section className="leads rounded-background">
          <h2>Leads</h2>
          {leads.length === 0 ? <p>No leads</p> : leads.map(l => (
            <LeadCard key={l.id} lead={l} onConverted={moveToProspect} />
          ))}
        </section>
        <section className="rounded-background">
          <h2>Prospects</h2>
          {prospects.length === 0 ? <p>No prospects</p> : prospects.map(p => (
            <div className="card" key={p.id}>
              <strong>{p.name}</strong>
              <div>ID: {p.nationalId}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default App
