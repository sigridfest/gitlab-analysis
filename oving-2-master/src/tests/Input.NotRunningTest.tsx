import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Input from '../components/Input/Input'

// NOT RUNNING DUE TO CONFIGURATION ERROR WITH OTHER PARTS OF THE PROJECT

/**
 * Testing button color reverts when mouse no longer hovers over 
 * Using fireEvent for mocking
 * Will pass in jsdom environment, not in node environment
 */
test('Button color change', async () => {
  render(<Input handleInputs={undefined} />);
  const button = screen.getByTestId('button');

  fireEvent.mouseOut(button);
  await waitFor(() => screen.getByTestId('button'))

  expect(button).toHaveStyle('background-color: ButtonFace');

});
