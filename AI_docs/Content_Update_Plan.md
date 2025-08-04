# Website Content Rewrite Plan

### Phase 1: Analysis and Content Mapping

- [x] Analyze the existing website structure to map the content sections from the document to the corresponding components in the codebase.
    - [x] **Hero Section:** `src/components/HeroSection.tsx`
    - [x] **How It Works:** `src/components/HowItWorks.tsx`
    - [x] **Features:** `src/components/Features.tsx`
    - [x] **Social Proof:** `src/components/SocialProof.tsx`
    - [x] **Pricing:** `src/components/Pricing.tsx`
    - [x] **Footer:** `src/components/Footer.tsx`
    - [x] **Newsletter Preview:** `src/components/NewsletterPreviewCard.tsx`

### Phase 2: Content Implementation

- [x] Systematically update each component with the new content from the provided PDF. This will be done section by section to ensure accuracy.

### Phase 3: New Component Creation

- [x] Create new components for sections specified in the document that do not have existing components.
    - [x] **FAQ Section:** Create a new `Faq.tsx` component to display the "Common Questions From Smart Traders" using an accordion style.
    - [x] **Exit-Intent Popup:** Develop a new `ExitIntentPopup.tsx` component as a modal that appears on exit intent.

### Phase 4: Integration and Final Review

- [x] Integrate all updated and new components into the main landing page file, `src/pages/Index.tsx`.
- [x] Conduct a final review to ensure all changes have been implemented correctly and match the document's specifications.
