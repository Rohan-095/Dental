# QA Checklist

## Before Each Deploy

### Mobile (375px)
- [ ] No text overflow or card overlap
- [ ] All CTAs visible and tappable (min 44px)
- [ ] Floating chat button not covering form fields
- [ ] Mobile menu opens and closes correctly
- [ ] Reviews snap-scroll works on touch

### Chat Widget
- [ ] Consent gate opens on button click
- [ ] "Start Chat" disabled until checkbox checked
- [ ] Chat panel opens after consent
- [ ] Quick replies trigger correct AI responses
- [ ] Typing indicator shows and hides
- [ ] Input clears after send
- [ ] Close button returns to closed state

### Links
- [ ] Phone link opens dialer: (604) 555-0192
- [ ] WhatsApp link opens correctly
- [ ] Nav anchor links scroll to correct sections

### Build
- [ ] `npm run build` passes with no errors
- [ ] No broken imports
- [ ] No TypeScript errors in .tsx files

### Admin
- [ ] /admin loads without errors
- [ ] All sidebar links navigate correctly
- [ ] No console errors on any admin page
