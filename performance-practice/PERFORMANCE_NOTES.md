# Performance Measurement Findings

## Test Results

- Dataset size: 50,000 items
- Filter result size: ~500 items (category 50)

## Timing Results

| Target Value | Execution Time | Notes                   |
| ------------ | -------------- | ----------------------- |
| value_40050  | ~3ms           | Early in filtered array |
| value_49950  | ~15ms          | Late in filtered array  |
| value_99999  | ~20ms          | Not found (worst case)  |

## Key Insights

1. Performance varies significantly based on data position
2. Worst-case scenario is 6-7x slower than best case
3. The filter operation itself is consistent; variation comes from the for loop
