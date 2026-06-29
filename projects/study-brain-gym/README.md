# Study Brain Gym · Day 8 v4

A workout-app-style all-subject learning trainer.

## v4 features

- First screen asks what grade the learner is in
- Supports grade 1 through grade 12
- Questions change difficulty based on grade band:
  - Grades 1–2: early elementary
  - Grades 3–5: elementary
  - Grades 6–8: middle school
  - Grades 9–12: high school
- Workout app layout
- Subject stations
- 5-rep workouts
- Game tokens
- One game per completed workout
- Strength/weakness tracking
- Grade level unlock rule

## Level-up rule

To unlock the next grade:

- Complete 5 reps in every subject
- Score at least 80% in every subject


## v5 update

Expanded the question bank and added no-repeat cycling.

Changes:
- More questions per subject
- More grade-level variety
- Separate banks for early elementary, elementary, middle school, and high school
- No-repeat system cycles through questions before repeating
- Uses fresh v5 localStorage keys


## v6 update

Changed Study Brain Gym to make grade readiness more fair.

- Workouts now use 10 questions per subject instead of 5.
- 6th, 7th, and 8th grade now have separate grade-specific question banks.
- A student starting 6th grade must master 6th grade first, then 7th, then 8th.
- Level-up requires 10 questions in every subject and 80% accuracy in every subject.
- This makes the app a better readiness ladder instead of jumping straight to harder work.


## v7 update

Expanded the grade-specific readiness system to every grade.

- Grades 1 through 12 now each have their own separate question banks.
- Every grade has 10 questions per subject.
- Every subject workout uses 10 reps/questions.
- Level-up still requires 10 questions in every subject and at least 80% accuracy in every subject.
- This means a student going into 6th grade must master 6th grade, then 7th grade, and only then prove readiness for 8th grade.
