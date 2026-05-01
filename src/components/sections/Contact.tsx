import { useState } from 'react'
import emailjs from '@emailjs/browser'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/your-handle',
    display: 'linkedin.com/in/your-handle',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/your-handle',
    display: 'github.com/your-handle',
  },
  {
    label: 'Email',
    href: 'mailto:ollieregan1@gmail.com',
    display: 'ollieregan1@gmail.com',
  },
]

const inputClass =
  'font-mono text-sm px-4 py-2.5 rounded-sm outline-none w-full border border-border bg-transparent text-ink'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 bg-white/50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="Get in touch" title="Contact" />

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className={inputClass}
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={inputClass}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </Button>
            {status === 'sent' && (
              <p className="font-mono text-xs text-green-600">Message sent!</p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs text-red-600">
                Something went wrong — try emailing directly.
              </p>
            )}
          </form>

          <div className="flex flex-col gap-6 justify-center">
            {SOCIALS.map(social => (
              <div key={social.label}>
                <p className="font-mono text-xs uppercase tracking-widest mb-1 text-muted">
                  {social.label}
                </p>
                <a
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-sm hover:underline text-ink"
                >
                  {social.display}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
