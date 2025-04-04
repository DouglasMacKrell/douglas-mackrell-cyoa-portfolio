import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  test('merges classnames correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  test('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', { 'active-class': isActive, 'inactive-class': !isActive });
    expect(result).toBe('base-class active-class');
  });

  test('handles falsy values', () => {
    expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2');
  });

  test('handles array of classnames', () => {
    expect(cn('class1', ['class2', 'class3'])).toBe('class1 class2 class3');
  });

  test('merges tailwind classes properly', () => {
    // Testing that tailwind-merge functionality works
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });
}); 