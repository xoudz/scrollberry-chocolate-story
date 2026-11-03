<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the bespoke gifting showcase and enquiry in a dedicated browser-only feature component, with enquiry formatting in a pure shared module, so presentation and contact dispatch remain independently testable.
- Never dispatch a business WhatsApp message without a verified destination number; provide copyable enquiry text and the existing Instagram contact until one is configured.
- Coordinate scroll effects through one browser-only animation-frame hook and element-local CSS variables, keeping React renders independent of scrolling and providing reduced-motion and touch-gallery fallbacks.
