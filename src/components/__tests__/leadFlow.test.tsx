import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import App from '../../App'

test('successful conversion moves lead to prospects', async () => {
  render(<App />)

  const leadElement = screen.getByText(/Ana Rodriguez/i)
  const leadCard = leadElement.closest('.card')
  if (!(leadCard instanceof HTMLElement)) {
    throw new Error('Expected .card to be an HTMLElement')
  }

const btn = within(leadCard).getByRole('button', { name: /validate/i })

  fireEvent.click(btn)

  await waitFor(() => {
    const prospectsSection = screen.getByRole('heading', { name: /prospects/i }).closest('section')!
    expect(within(prospectsSection).getByText(/Ana Rodriguez/i)).toBeInTheDocument()
  }, { timeout: 4000 })

  const leadsSection = screen.getByRole('heading', { name: /leads/i }).closest('section')!
  expect(within(leadsSection).queryByText(/Ana Rodriguez/i)).toBeNull()
})
