import { COMPANY, SITE_URL } from '../config'

// Privacy and Terms share one layout. The copy below describes what this site
// actually does — a contact form that emails Elena, and no tracking cookies.
//
// NOTE: this is a plain-language starting point written to match the site's
// real behaviour, not legal advice. Have it reviewed before launch, and update
// it if analytics or a tracking pixel is ever added.
function LegalPage({ title, updated, children }) {
  return (
    <section className="section legal">
      <div className="container container--narrow">
        <p className="eyebrow reveal">Legal</p>
        <h1 className="legal__title reveal" style={{ '--delay': '60ms' }}>{title}</h1>
        <p className="legal__updated reveal" style={{ '--delay': '90ms' }}>Last updated {updated}</p>
        <div className="legal__body reveal" style={{ '--delay': '120ms' }}>{children}</div>
      </div>
    </section>
  )
}

const ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}`

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <h2>Who we are</h2>
      <p>
        {COMPANY.legalName} (“Aspire”, “we”) is the data controller for personal data collected
        through {SITE_URL}. Our registered details are {COMPANY.registration}, and our
        office is at {ADDRESS}. You can reach us at{' '}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or {COMPANY.phone}.
      </p>

      <h2>What we collect, and why</h2>
      <p>
        The only personal data this website collects is what you type into the contact
        form: your name, email address, and optionally your company, phone number, the
        service you are interested in, and your message.
      </p>
      <p>
        We use it for one purpose: to reply to you and, if you want one, to arrange a
        discovery call. The lawful basis is your consent, given by submitting the form, and
        our legitimate interest in responding to a business enquiry. We do not sell your
        data, and we do not add you to a marketing list without asking you first.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This site sets no advertising or tracking cookies. Optional analytics are switched
        off unless you choose to allow them, and your choice is stored on your own device.
        Full detail is in the <a href="/cookies">cookie policy</a>.
      </p>

      <h2>Who else sees your data</h2>
      <p>
        Form submissions are delivered by our form provider and stored in our email. Our
        hosting and email providers process the data on our behalf under their own data
        protection terms. We do not share your details with anyone else.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries are kept for as long as the conversation is live and for up to
        twenty-four months afterwards, so we can pick the thread back up if you return.
        After that they are deleted. Ask us to delete yours sooner and we will.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you can ask us for a copy of the data we hold about you, correct it,
        delete it, restrict or object to how we use it, or receive it in a portable format.
        Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and we will respond
        within one month.
      </p>
      <p>
        If you are not satisfied with our response, you can complain to the Spanish data
        protection authority, the Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>
        ), or to the supervisory authority in your own country.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes we will update the date at the top of this page. Material
        changes will be flagged on the site.
      </p>
    </LegalPage>
  )
}

export function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="September 2026">
      <h2>These terms</h2>
      <p>
        These terms cover your use of {SITE_URL}, operated by {COMPANY.legalName} of {ADDRESS}.
        By using the site you accept them. They do not cover client engagements, which are
        governed by the separate agreement we sign with you.
      </p>

      <h2>Using the site</h2>
      <p>
        You may read, share and link to anything published here. You may not copy the
        content wholesale for commercial use, attempt to disrupt the site, or use it for
        anything unlawful.
      </p>

      <h2>Our content</h2>
      <p>
        The text, design, images and the Aspire name and wordmark on this site belong to us
        or are used with permission. Client names and case details are published with those
        clients’ knowledge and remain their property.
      </p>

      <h2>Accuracy and results</h2>
      <p>
        We keep this site accurate, but it is marketing material, not a warranty. Figures
        describing past engagements are what happened for those clients in those
        circumstances. They are not a promise of the same outcome for you. Nothing on this
        site is professional advice; the advice comes when we are engaged.
      </p>

      <h2>External links</h2>
      <p>
        Where we link out to other sites, we do not control what is on them and are not
        responsible for their content or their privacy practices.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, we are not liable for loss arising from your use of
        this website. Nothing here limits liability that cannot lawfully be limited.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by Spanish law, and the courts of {COMPANY.city} have
        jurisdiction over any dispute arising from them.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{' '}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </LegalPage>
  )
}

export function Cookies() {
  return (
    <LegalPage title="Cookie Policy" updated="September 2026">
      <h2>The short version</h2>
      <p>
        This site does not track you. It sets no advertising cookies, no social pixels and
        no third party trackers. The only thing stored on your device by default is the
        record of the cookie choice you made, so we do not ask again on every page.
      </p>

      <h2>What is stored</h2>
      <div className="table-scroll">
        <table className="legal__table">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Purpose</th><th>Kept for</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>aspire-consent</code></td>
              <td>Essential</td>
              <td>Remembers whether you allowed optional analytics, so the banner is shown once rather than on every visit.</td>
              <td>Until you clear your browser storage</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>Optional</td>
              <td>Aggregate page view counts, used only to see which pages are worth keeping. Not set unless you choose to allow them.</td>
              <td>Not currently in use</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Analytics are listed because the consent choice exists to gate them. At the time of
        writing no analytics provider is loaded on this site at all, whichever option you
        pick. If one is added, it will only load for visitors who allowed it.
      </p>

      <h2>Changing your mind</h2>
      <p>
        Use the <strong>Cookie settings</strong> link in the footer to reopen the banner and
        change your choice at any time. You can also clear this site&rsquo;s data in your
        browser settings, which removes the stored choice entirely.
      </p>

      <h2>Blocking cookies</h2>
      <p>
        Every major browser lets you block or delete cookies and site storage. Because
        nothing here depends on cookies to function, blocking them will not break the site.
        The only effect is that the consent banner will appear again on your next visit,
        since there is nowhere to record that you already answered.
      </p>

      <h2>Questions</h2>
      <p>
        Anything about this policy, or about the personal data in our{' '}
        <a href="/privacy">privacy policy</a>, can go to{' '}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </LegalPage>
  )
}
