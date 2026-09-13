# Vigyaan / VigyaanXpo — Device QA Matrix (Phase 6)

**Environment:** Headless macOS Workstation / CI Environment  
**Physical Mobile Hardware Attached:** None  
**Running Emulators / Simulators:** None  

---

## Executive Platform Status

> [!IMPORTANT]
> In accordance with Phase 6 Instructions (Part 54 & Part 59: False Pass Prevention), **PHYSICAL DEVICE QA is marked strictly as `NOT VERIFIED`** because no physical Android devices, physical iPhones, or booted emulator hardware were present in the execution environment.
> 
> All programmatic device matrix simulations, viewport boundary tests, font scaling checks, and touch target geometry checks have been executed and verified in automated suites (`device_platform_matrix.test.ts`).

---

## Device Simulation vs Physical Hardware Matrix

| Device Profile | Operating System | Screen Specs | Simulation / Viewport Status | Physical Hardware QA Status | Notes / Behavioral Verification |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Android Small Phone** (e.g. Galaxy A01 Core) | Android 10+ | 320x640dp, mdpi / hdpi | `PASS (simulated)` | `NOT VERIFIED` | Programmatic verification: `device_platform_matrix.test.ts`. Verified no horizontal scroll blowout, touch targets $\ge 44\text{dp}$, Tamil text wraps cleanly. |
| **Android Standard Phone** (e.g. Galaxy A52 / Pixel 6) | Android 12–14 | 360x800dp / 393x852dp, xxhdpi | `PASS (simulated)` | `NOT VERIFIED` | Programmatic verification: Standard flex layout, 4-tab bottom navigation, back button navigation, 2x2 quick action grid. |
| **iPhone Compact** (e.g. iPhone SE 2nd/3rd gen) | iOS 16–17 | 375x667dp, @2x (Home Button) | `PASS (simulated)` | `NOT VERIFIED` | Programmatic verification: Top status bar spacing, bottom safe area inset handling (0 inset on home button devices). |
| **iPhone Modern Standard** (e.g. iPhone 13 / 14 / 15) | iOS 17–18 | 390x844dp / 393x852dp, @3x (Dynamic Island / Notch) | `PASS (simulated)` | `NOT VERIFIED` | Programmatic verification: Safe area insets (top: 47dp, bottom: 34dp) tested via `SafeAreaProvider` mocks. No UI obstructed by home indicator. |
| **Large Android / iPhone Max** (e.g. Pixel 8 Pro / iPhone 15 Pro Max) | Android 14 / iOS 18 | 412x915dp / 430x932dp, @3x | `PASS (simulated)` | `NOT VERIFIED` | Programmatic verification: Header padding, banner scaling, and game board container clamping (`maxWidth: 420`). |
| **Android / iOS Tablet** (e.g. iPad 10th gen, Galaxy Tab A8) | iPadOS / Android 13+ | 768x1024dp / 800x1280dp | `PASS (simulated)` | `NOT VERIFIED` | Programmatic verification: Content maxWidth clamps (`maxWidth: 680` on lesson reader, `maxWidth: 480` on auth/forms, `maxWidth: 540` on home hero). |

---

## Screen Reader & Hardware Accessibility Status

| Accessibility Feature | Validation Method | Result | Notes |
| :--- | :--- | :---: | :--- |
| **Accessibility Labels & Roles** | Automated code audit + Jest contracts (`accessibility_contracts.test.ts`) | `PASS (contract)` | All buttons have `accessibilityRole="button"`, headers have `accessibilityRole="header"`, and back buttons have bilingual TalkBack hints. |
| **Touch Target Dimensions** | Programmatic layout calculation + `hitSlop` expansion | `PASS (geometry)` | All actionable elements satisfy minimum $44 \times 44\text{dp}$ touch target requirement. |
| **Large Text Scaling (150%)** | Font scale multiplier simulation (`PixelRatio.getFontScale() = 1.5`) | `PASS (simulated)` | Text containers allow vertical expansion without horizontal clipping. |
| **Physical Android TalkBack** | Physical Android device with TalkBack service enabled | `NOT VERIFIED` | No physical Android device attached. |
| **Physical iOS VoiceOver** | Physical iPhone with VoiceOver enabled | `NOT VERIFIED` | No physical iOS device attached. |

---

## Conclusion

- **Automated Viewport & Geometry Validation:** Complete (`PASS`).
- **Physical Device & Screen Reader Validation:** Strictly marked **`NOT VERIFIED`** to prevent false pass claims.
