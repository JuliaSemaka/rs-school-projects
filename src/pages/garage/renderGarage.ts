import { renderCars } from './cars/renderCars';

export function renderGarage(): string {
  return `
  <div class="settings">
    <div class="settings-auto settings-auto__create">
      <input type="text" class="settings-auto_input" id="create-car-input">
      <input type="color" class="settings-auto_color" id="create-car-color" value="#8fbc8f">
      <input type="button" class="button button-white text-button settings-auto_button
      create-car__button" value="Create">
    </div>
    <div class="settings-auto settings-auto__update">
      <input type="text" class="settings-auto_input" id="update-car-input" disabled>
      <input type="color" class="settings-auto_color" id="update-car-color" disabled value="#f2f9fe">
      <input type="button" class="button button-white text-button settings-auto_button
      update-car__button" disabled value="Update">
    </div>
    <div class="settings-auto settings-auto__buttons">
      <input type="button" class="button button-white text-button race-all" value="Race">
      <input type="button" class="button button-white text-button reset-all" value="Reset" disabled>
      <input type="button" class="button button-white text-button generate-cars" value="Generate cars">
    </div>
  </div>


  <div class="cars" id="cars">
    ${renderCars()}
  </div>
  `;
}
