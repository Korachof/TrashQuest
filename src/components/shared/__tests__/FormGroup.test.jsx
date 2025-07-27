// Tests for the FormGroup component
import React from 'react';
import FormGroup from '../FormGroup';
import { vi } from 'vitest';

describe('FormGroup', () => {
  const defaultProps = {
    label: 'Email',
    type: 'email',
    value: '',
    onChange: vi.fn(), // reusable mock
    id: 'email-input',
  };
});
