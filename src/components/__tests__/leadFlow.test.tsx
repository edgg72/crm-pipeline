import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import App from '../../App'

test('successful conversion moves lead to prospects', async () => {
  render(<App />)

  const leadCard = screen.getByText(/Ana Rodriguez/i).closest('.card')!
  const btn = within(leadCard).getByRole('button', { name: /validate/i })

  fireEvent.click(btn)

  await waitFor(() => {
    const prospectsSection = screen.getByRole('heading', { name: /prospects/i }).closest('section')!
    expect(within(prospectsSection).getByText(/Ana Rodriguez/i)).toBeInTheDocument()
  }, { timeout: 4000 })

  const leadsSection = screen.getByRole('heading', { name: /leads/i }).closest('section')!
  expect(within(leadsSection).queryByText(/Ana Rodriguez/i)).toBeNull()
})
