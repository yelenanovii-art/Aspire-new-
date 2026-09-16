import LeadForm from '../components/LeadForm'
import { Mail, Phone, Pin, ArrowRight } from '../components/Icons'
import Faq from '../components/Faq'
import SectionHead from '../components/SectionHead'
import { COMPANY, BOOKING_URL } from '../config'

export default function Contact() {
  return (
    <>
      <section className="section contact-section">
        <div className="container contact-layout">
          <div className="contact-copy">
            <p className="eyebrow reveal">Get started</p>
            <h1 className="contact-title reveal" style={{ '--delay': '60ms' }}>
              Set up your free 15-minute discovery call.
            </h1>
            <p className="lead reveal" style={{ '--delay': '110ms' }}>
              Tell us where you want to grow. Elena will come back within one business day
              to book the call, and you will leave it with a view on what to do first,
              whether or not you run it with us.
            </p>

            <ul className="contact-meta reveal" style={{ '--delay': '160ms' }}>
              <li>
                <span className="contact-meta__k"><Mail /> Email</span>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li>
                <span className="contact-meta__k"><Phone /> Phone</span>
                <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a>
              </li>
              <li>
                <span className="contact-meta__k"><Pin /> Office</span>
                <span>
                  {COMPANY.street}<br />
                  {COMPANY.postalCode} {COMPANY.city}, {COMPANY.country}
                </span>
              </li>
            </ul>

            {BOOKING_URL && (
              <a className="link-arrow reveal" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Or pick a slot in the calendar directly <ArrowRight />
              </a>
            )}
          </div>

          <div className="contact-form-wrap reveal" style={{ '--delay': '80ms' }}>
            <LeadForm source="contact-page" />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <SectionHead eyebrow="Before you write" title="The things people ask first." center />
          <Faq
            idPrefix="contact-faq"
            items={[
              {
                q: 'What happens after I send this?',
                a: 'Elena reads it personally and replies within one business day to book the free 15-minute call. No automated sequence, no sales development rep.',
              },
              {
                q: 'Is the first call really free?',
                a: 'Yes, and there is no obligation attached to it. If we are not the right fit we will tell you on the call and point you somewhere better.',
              },
              {
                q: 'Do I need to know what I want yet?',
                a: 'No. Plenty of clients arrive with "we need to grow but we are not sure how". Working that out is what the call is for.',
              },
              {
                q: 'Which languages do you work in?',
                a: 'English and Spanish, based in Barcelona and working with clients across Europe.',
              },
            ]}
          />
        </div>
      </section>
    </>
  )
}
