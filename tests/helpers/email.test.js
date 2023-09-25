const email = require('../../app/helpers/Email')

jest.mock('../../app/helpers/Email', () => ({
  send: jest.fn().mockReturnValue({
    accepted: ['test@gmail.com'],
    rejected: []
  })
}))

test('send recover password', async () => {
  const response = await email.send({
    user: { email: 'test@gmail.com' },
    subject: 'Recover Password',
    urlResetLink: 'http://localhost:5000/reset-password/d3a9aa688128a6f5f9572be114dcacd9e13328ab',
    template: 'recover-password-template'
  })

  expect(response.accepted).toContain('test@gmail.com')
})
