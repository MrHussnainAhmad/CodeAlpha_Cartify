# Security Policy

We take the security of this project seriously and appreciate responsible disclosures from the community.

---

## Supported Versions

Only the versions listed as ✅ Supported below receive security updates.  
Please upgrade to a supported version to ensure you receive the latest fixes.

| Version | Status     |
|-------- |----------- |
| main    | ✅ Supported |
| latest  | ✅ Supported |
| < latest | ❌ Not Supported |

> If you are using a fork or a significantly modified version, behavior and patchability may differ.

---

## Reporting a Vulnerability

If you believe you’ve found a security vulnerability, **do not open a public issue**.  
Instead, please use one of the following private channels:

- **Email:** `security@example.com`  
  - Subject line: `Security Report: <short description>`
- **GitHub Security Advisory (preferred, if enabled):**
  - Go to the repository’s **“Security” → “Advisories” → “Report a vulnerability”** and follow the form.

Please include as much detail as possible so we can investigate quickly:

1. A clear description of the vulnerability.
2. Steps to reproduce (proof of concept, demo code, or screenshots if applicable).
3. Affected version/branch/commit.
4. Any potential impact you have identified.

---

## Response & Disclosure Process

- We will **acknowledge your report** within **72 hours**.
- We aim to provide an **initial assessment** within **7 days**.
- If the vulnerability is confirmed, we will:
  - Work on a fix and test it.
  - Prepare a security release and update documentation.
  - Coordinate a responsible disclosure timeline with you (when possible).

Once a fix is available:

- We will publish a new release and update the changelog.
- We may publish a GitHub Security Advisory describing the impact, affected versions, and mitigation steps.
- You may be credited in the advisory and release notes (unless you prefer to remain anonymous).

---

## Scope

This security policy covers:

- The core application code in this repository.
- Default configuration as documented in the project.

It does **not** cover:

- Third-party dependencies or services (e.g., cloud providers, plugins, or browser extensions).
- Deployments that differ significantly from the recommended setup.

---

## Best Practices for Users

To help keep your deployment secure:

- Always run a **supported version**.
- Keep your environment (OS, Node.js, database, etc.) **up to date**.
- Rotate secrets and API keys regularly.
- Restrict access to admin panels and sensitive endpoints.
- Use HTTPS in production.

---

Thank you for helping to keep this project and its users safe.
