/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import { Given, When, Then, Fusion } from 'jest-cucumber-fusion';
import { render, RenderResult } from '@testing-library/react';
import { Home } from './Home.patternfly';
import React, { ReactElement } from 'react';

let renderResult: RenderResult;
let component: ReactElement;

Given('a Home component', () => {
  component = <Home />;
});

When('it is rendered', () => {
  renderResult = render(component);
});

Then('it should display the expected text', () => {
  const { getByText } = renderResult;
  expect(
    getByText('Welcome to the Strimzi UI for PatternFly')
  ).toBeInTheDocument();
});

When('it is rendered with no version', () => {
  renderResult = render(component);
});

Then('it should display the expected text', () => {
  const { getByText } = renderResult;
  expect(
    getByText('Welcome to the Strimzi UI for PatternFly')
  ).toBeInTheDocument();
});

Fusion('Home.feature');
