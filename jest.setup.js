import "regenerator-runtime/runtime";
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

expect.extend({ toHaveNoViolations });