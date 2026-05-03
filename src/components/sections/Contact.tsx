import { useState } from 'react'
import emailjs from '@emailjs/browser'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { socials } from '../../data/socials.tsx'

const PHONE_REGEX = /^[+\d][\d\s\-().]{6,19}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'font-mono text-sm px-4 py-2.5 rounded-sm outline-none w-full border border-border bg-transparent text-ink'

const errorClass = 'font-mono text-xs text-red-600 mt-1'

const errorBorder = 'border-red-400'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' })

  const validate = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : ''
      case 'email':
        return value && !EMAIL_REGEX.test(value) ? 'Enter a valid email address' : ''
      case 'phone':
        return value && !PHONE_REGEX.test(value) ? 'Enter a valid phone number' : ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nameErr = validate('name', form.name)
    const emailErr = validate('email', form.email)
    const phoneErr = validate('phone', form.phone)
    if (nameErr || emailErr || phoneErr) {
      setErrors({ name: nameErr, email: emailErr, phone: phoneErr })
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, from_phone: form.phone, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
      setErrors({ name: '', email: '', phone: '' })
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
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className={`${inputClass} ${errors.name ? errorBorder : ''}`}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`${inputClass} ${errors.email ? errorBorder : ''}`}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone (optional)"
                className={`${inputClass} ${errors.phone ? errorBorder : ''}`}
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />

            <Button
              type="submit"
              disabled={
                status === 'sending' ||
                !form.name.trim() ||
                !EMAIL_REGEX.test(form.email) ||
                !!errors.name ||
                !!errors.email ||
                !!errors.phone
              }
            >
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

          <div className="flex flex-col gap-5 justify-center">
            {socials.map(({ label, href, display, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Icon
                  size={18}
                  className="text-muted group-hover:text-ink transition-colors shrink-0"
                />
                <span className="font-mono text-sm text-muted group-hover:text-ink transition-colors">
                  {display}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
