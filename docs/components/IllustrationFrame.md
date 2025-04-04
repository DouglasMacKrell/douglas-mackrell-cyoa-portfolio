# 🖼️ Illustration Frame

The Illustration Frame is a key UI component that replicates the distinctive frame style used in classic Choose Your Own Adventure books.

## Design Specifications

The illustration frame follows a distinctive "mushroom" shape with specific characteristics:

### Shape Details

#### Top Section
- Gentle rounded corners at the top
- Straight vertical sides extending down from the rounded corners
- Perfect quarter-circle rounding, taking up nearly 25% of the frame width on each side

#### Bottom Section
- Right-angle notches (not diagonal cuts) at each bottom corner
- Each corner has two 90-degree cuts forming an "L" shape
- Vertical cut starts about 15% up from bottom
- Horizontal cut extends about 15% in from side

### Border Structure
- Two-tone border structure:
  - Thin outer border (3-4px) in darker orange-red
  - Wide inner border (20-24px) in brighter orange-red
  - Borders are flush with each other, no gaps
- Both borders follow the exact same shape

## Implementation Note

The key to the correct implementation is to use a container with the proper shape that crops both the illustration and its borders:

```tsx
// Container that defines the overall shape
const FrameContainer = styled.div`
  position: relative;
  border-top-left-radius: 25%;
  border-top-right-radius: 25%;
  overflow: hidden;
  clip-path: polygon(
    0 0,                    /* top-left start */
    100% 0,                /* top-right */
    100% 85%,              /* right edge before notch */
    100% 85%,              /* start of right notch */
    85% 85%,               /* right notch horizontal */
    85% 100%,              /* right notch vertical */
    15% 100%,              /* left notch bottom */
    15% 85%,               /* left notch vertical */
    0 85%                  /* back to left edge */
  );
`;

// Inner and outer borders
const BorderOuter = styled.div`
  position: absolute;
  inset: 0;
  border: 3px solid #8b2e2e; /* darker red */
`;

const BorderInner = styled.div`
  position: absolute;
  inset: 3px;
  border: 20px solid #c13a3a; /* brighter red */
`;
```

## Usage Example

```tsx
import { IllustrationFrame } from '@/components/IllustrationFrame';

export default function Page() {
  return (
    <IllustrationFrame>
      <img src="/journey.webp" alt="Adventure illustration" />
    </IllustrationFrame>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to display inside the frame (typically an image) |
| `className` | `string` | - | Additional CSS classes to apply to the frame |
| `borderColor` | `string` | `'red'` | Color theme for the borders |

## Accessibility Considerations

- Ensure any images placed within the frame have proper `alt` text
- The frame is purely decorative and should not interfere with content accessibility
- No animation effects that could trigger motion sensitivity 