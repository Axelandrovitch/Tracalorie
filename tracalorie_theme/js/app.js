class CalorieTracker {
  constructor() {
    this._calorieLimit = 2200;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesburned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
  //Public methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  //Private Methods

  _displayCaloriesTotal() {
    const totalCalEl = document.querySelector("#calories-total");
    totalCalEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const calorieLimitEl = document.querySelector("#calories-limit");
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector("#calories-consumed");
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesburned() {
    const caloriesBurnedEl = document.querySelector("#calories-burned");
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const progressEl = document.querySelector("#calorie-progress");
    const caloriesRemainingEl = document.querySelector("#calories-remaining");
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
    if (remaining < 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.querySelector("#calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesburned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .querySelector("#meal-form")
      .addEventListener("submit", this._newMeal.bind(this));
    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();
    const name = document.querySelector("#meal-name").value;
    const calories = document.querySelector("#meal-calories").value;
    if (name && calories) {
      const meal = new Meal(name, parseInt(calories));
      this._tracker.addMeal(meal);
      document.querySelector("#meal-name").value = "";
      document.querySelector("#meal-calories").value = "";
      const collapseMeal = document.querySelector("#collapse-meal");
      const bsCollapse = new bootstrap.Collapse(collapseMeal, {
        toggle: true,
      });
    } else {
      alert("Please enter a valid name and calorie amount");
    }
  }
  _newWorkout(e) {
    e.preventDefault();
    const name = document.querySelector("#workout-name").value;
    const calories = document.querySelector("#workout-calories").value;
    if (name && calories) {
      const workout = new Workout(name, parseInt(calories));
      this._tracker.addWorkout(workout);
      document.querySelector("#workout-name").value = "";
      document.querySelector("#workout-calories").value = "";
      const collapseWorkout = document.querySelector("#collapse-workout");
      const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
        toggle: true,
      });
    } else {
      alert("Please enter a valid name and calorie amount");
    }
  }
}

const app = new App();
