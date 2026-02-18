import { render } from '@testing-library/react';
import axe from 'axe-core';
import { expect, it } from 'vitest';

import App from './App';
import { ThemeProvider } from './components/ThemeProvider';
import './i18n';

it('App should not have any accessibility violations', async () => {
  const { container } = render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  const results = await axe.run(container);

  const violationsMesssage = JSON.stringify(results.violations);
  expect(results.violations, violationsMesssage).toHaveLength(0);
});
