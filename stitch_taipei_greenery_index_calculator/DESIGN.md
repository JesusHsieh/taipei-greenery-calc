# Design System Document: Technical Sophistication & Editorial Clarity

## 1. Overview & Creative North Star: "The Clinical Architect"
The Creative North Star for this design system is **"The Clinical Architect."** This philosophy moves away from the "busy" nature of traditional technical dashboards, favoring an editorial approach where data is treated like high-end typography in a technical journal. 

We break the "template" look through **expansive white space, intentional asymmetry, and tonal depth**. Instead of boxing data into rigid containers, we allow the content to breathe, using the hierarchy of the page to guide the eye. This is not just a dashboard; it is a precision instrument designed for deep focus.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a sophisticated range of off-whites and cool grays, punctuated by a deep teal primary accent that signals action and importance.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts or subtle tonal transitions.
*   **Surface:** `#f8f9fa` (The base canvas)
*   **Surface-Container-Low:** `#f1f4f6` (Subtle sectioning)
*   **Surface-Container-Highest:** `#dbe4e7` (Emphasis or active states)

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
*   **Base:** Start with `surface`. 
*   **Nested Content:** Place a `surface-container-lowest` (#ffffff) card inside a `surface-container-low` section to create a soft, natural lift.
*   **Depth:** Use `surface-dim` (#d1dce0) sparingly for utility bars to ground the layout against the lighter work area.

### The "Glass & Gradient" Rule
To elevate the "out-of-the-box" feel, use **Glassmorphism** for floating elements (modals, popovers). Use semi-transparent `surface` colors with a `20px` backdrop-blur. 
*   **Signature Texture:** Main CTAs should utilize a subtle linear gradient from `primary` (#2e6767) to `primary_dim` (#205b5b) at a 135° angle to provide a "weighted" feel that flat colors cannot achieve.

---

## 3. Typography: Editorial Precision
We utilize a dual-typeface system to balance technical efficiency with sophisticated hierarchy.

*   **Display & Headlines (Public Sans):** Used for high-level data points and page titles. The slightly wider stance of Public Sans conveys authority.
    *   *Display-LG:* 3.5rem | *Headline-SM:* 1.5rem
*   **Body & Labels (Inter):** Used for all data entry, technical readouts, and UI controls. Inter’s tall x-height ensures legibility in dense data environments.
    *   *Body-MD:* 0.875rem (The workhorse)
    *   *Label-SM:* 0.6875rem (Used for metadata and micro-copy)

**Hierarchy Tip:** Contrast a `display-md` metric in `on_surface` with a `label-md` descriptor in `on_surface_variant` to create immediate visual clarity without adding lines or boxes.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows and borders are replaced by light and tone.

### The Layering Principle
Depth is achieved by "stacking" tiers. A `surface-container-lowest` card placed on a `surface-container-low` background creates a "Ghost Lift." This provides enough contrast for the eye to perceive a container without the visual "noise" of a stroke.

### Ambient Shadows
When a floating effect is required (e.g., a primary action menu):
*   **Blur:** 32px – 48px
*   **Opacity:** 4% – 8%
*   **Shadow Color:** Use a tinted version of `on_surface` (#2b3437) rather than pure black to mimic natural light.

### The "Ghost Border" Fallback
If accessibility requirements demand a border (e.g., high-contrast mode), use a **Ghost Border**:
*   **Token:** `outline_variant` (#abb3b7)
*   **Opacity:** 15% 
*   **Weight:** 1px

---

## 5. Components

### Buttons
*   **Primary:** Gradient (Primary to Primary-Dim), `on_primary` text, `md` (0.375rem) roundedness. No shadow.
*   **Secondary:** `surface_container_high` background, `on_surface` text.
*   **Tertiary:** Transparent background, `primary` text. Use for low-emphasis actions like "Cancel" or "Export."

### Input Fields
*   **Resting State:** `surface_container_lowest` background. No border. A subtle 2px bottom-accent in `outline_variant` at 20% opacity.
*   **Focus State:** The bottom-accent transitions to `primary` (#2e6767) with a thickness of 2px.
*   **Validation:** Use `error` (#9f403d) only for the helper text and a 2px bottom-accent. Avoid "red boxes."

### Cards & Data Lists
*   **Rule:** Forbid divider lines. 
*   **Implementation:** Use vertical whitespace (32px - 48px) to separate list items. For dense tables, use alternating row fills of `surface` and `surface-container-low`.
*   **Interactive State:** On hover, a card should shift from `surface` to `surface-container-lowest` and gain an **Ambient Shadow**.

### Additional Dashboard Primitives
*   **The "Data Pillar":** A custom component for KPIs. A large `display-sm` value sitting atop a `label-md` title, aligned left with 64px of right-side padding to create asymmetrical "breathing room."
*   **Progressive Disclosure Triggers:** Thin 0.5px `primary` lines used sparingly to connect related data nodes in a flow, reinforcing the "technical" aesthetic.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `primary` sparingly. It should be a "signal," not a "wash."
*   **Do** lean into asymmetry. Align key metrics to a 12-column grid, but leave columns 11 and 12 empty to create an editorial feel.
*   **Do** use `surface-container` tiers to group related inputs.

### Don’t
*   **Don’t** use 100% black text. Always use `on_surface` (#2b3437) for a softer, premium feel.
*   **Don’t** use "Card Shadows" on every element. If everything floats, nothing is important.
*   **Don’t** use standard 1px dividers. If you feel you need a line, use a 16px gap of white space instead.