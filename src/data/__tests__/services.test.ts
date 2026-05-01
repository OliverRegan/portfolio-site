import { services } from '../services'

describe('services data', () => {
  it('has at least one service', () => {
    expect(services.length).toBeGreaterThan(0)
  })

  it('every service has required fields', () => {
    services.forEach(service => {
      expect(service.id).toBeTruthy()
      expect(service.title).toBeTruthy()
      expect(service.description).toBeTruthy()

    })
  })

  it('service ids are unique', () => {
    const ids = services.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
