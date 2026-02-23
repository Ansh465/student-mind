export function Disclaimer() {
    return (
        <footer className="w-full border-t border-[var(--border)] px-4 py-3"
            style={{ background: 'var(--bg-raised)' }}>
            <p className="text-center text-xs text-[var(--text-muted)] max-w-4xl mx-auto">
                <span className="font-semibold text-[var(--amber)]">⚠️ Important Disclaimer:</span>{' '}
                This application provides informational tools based on user input. It is{' '}
                <span className="font-semibold text-[var(--text-sub)]">not legal advice</span>. Always consult the official{' '}
                <a
                    href="https://www.gov.uk/student-visa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[var(--text)] transition-colors"
                    style={{ color: 'var(--indigo)' }}
                >
                    GOV.UK website
                </a>{' '}
                or a qualified immigration advisor for definitive guidance on your visa and work rights.
            </p>
        </footer>
    )
}
