from django.core.management.base import BaseCommand
from django.utils import timezone
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Delete existing data
        self.stdout.write('Deleting existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes',
            created_at=timezone.now()
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League Warriors',
            created_at=timezone.now()
        )

        # Create Marvel superheroes
        self.stdout.write('Creating Marvel superheroes...')
        marvel_users = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com', 'password': 'arc_reactor123'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com', 'password': 'shield123'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com', 'password': 'mjolnir123'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com', 'password': 'widow123'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com', 'password': 'smash123'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com', 'password': 'webslinger123'},
        ]

        marvel_user_objects = []
        for user_data in marvel_users:
            user = User.objects.create(
                name=user_data['name'],
                email=user_data['email'],
                password=user_data['password'],
                team_id=str(team_marvel._id),
                created_at=timezone.now()
            )
            marvel_user_objects.append(user)

        # Create DC superheroes
        self.stdout.write('Creating DC superheroes...')
        dc_users = [
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com', 'password': 'gotham123'},
            {'name': 'Superman', 'email': 'clark.kent@dc.com', 'password': 'krypton123'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com', 'password': 'amazon123'},
            {'name': 'Flash', 'email': 'barry.allen@dc.com', 'password': 'speedforce123'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com', 'password': 'atlantis123'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com', 'password': 'willpower123'},
        ]

        dc_user_objects = []
        for user_data in dc_users:
            user = User.objects.create(
                name=user_data['name'],
                email=user_data['email'],
                password=user_data['password'],
                team_id=str(team_dc._id),
                created_at=timezone.now()
            )
            dc_user_objects.append(user)

        # Create activities for all users
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing']
        all_users = marvel_user_objects + dc_user_objects

        for user in all_users:
            for i in range(random.randint(3, 8)):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 120)
                calories = duration * random.randint(5, 15)
                distance = random.uniform(1.0, 15.0) if activity_type in ['Running', 'Cycling', 'Swimming'] else None
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_type,
                    duration=duration,
                    calories_burned=calories,
                    distance=distance,
                    date=timezone.now() - timedelta(days=random.randint(0, 30)),
                    notes=f'{activity_type} session by {user.name}'
                )

        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        for idx, user in enumerate(all_users):
            user_activities = Activity.objects.filter(user_id=str(user._id))
            total_calories = sum(activity.calories_burned for activity in user_activities)
            total_activities = user_activities.count()
            total_distance = sum(activity.distance for activity in user_activities if activity.distance)
            
            Leaderboard.objects.create(
                user_id=str(user._id),
                team_id=user.team_id,
                total_calories=total_calories,
                total_activities=total_activities,
                total_distance=total_distance,
                rank=idx + 1,
                last_updated=timezone.now()
            )

        # Create workout suggestions
        self.stdout.write('Creating workout suggestions...')
        workouts = [
            {
                'name': 'Super Soldier Circuit',
                'description': 'High-intensity circuit training inspired by Captain America',
                'activity_type': 'Weightlifting',
                'difficulty': 'Advanced',
                'duration': 45,
                'calories_estimate': 500
            },
            {
                'name': 'Web-Slinger Cardio',
                'description': 'Fast-paced cardio workout with agility drills',
                'activity_type': 'Running',
                'difficulty': 'Intermediate',
                'duration': 30,
                'calories_estimate': 350
            },
            {
                'name': 'Asgardian Strength Training',
                'description': 'Heavy lifting routine for building godlike strength',
                'activity_type': 'Weightlifting',
                'difficulty': 'Advanced',
                'duration': 60,
                'calories_estimate': 600
            },
            {
                'name': 'Speedster Sprint Training',
                'description': 'Explosive sprint intervals for maximum speed',
                'activity_type': 'Running',
                'difficulty': 'Advanced',
                'duration': 25,
                'calories_estimate': 400
            },
            {
                'name': 'Amazon Warrior Yoga',
                'description': 'Flexibility and strength training with yoga poses',
                'activity_type': 'Yoga',
                'difficulty': 'Intermediate',
                'duration': 40,
                'calories_estimate': 250
            },
            {
                'name': 'Atlantean Swimming',
                'description': 'Endurance swimming workout for ocean-worthy fitness',
                'activity_type': 'Swimming',
                'difficulty': 'Intermediate',
                'duration': 45,
                'calories_estimate': 450
            },
            {
                'name': 'Dark Knight Boxing',
                'description': 'Combat training with heavy bag and shadow boxing',
                'activity_type': 'Boxing',
                'difficulty': 'Advanced',
                'duration': 50,
                'calories_estimate': 550
            },
            {
                'name': 'Hulk Smash Strength',
                'description': 'Powerlifting routine for incredible strength gains',
                'activity_type': 'Weightlifting',
                'difficulty': 'Expert',
                'duration': 70,
                'calories_estimate': 700
            },
        ]

        for workout_data in workouts:
            Workout.objects.create(
                name=workout_data['name'],
                description=workout_data['description'],
                activity_type=workout_data['activity_type'],
                difficulty=workout_data['difficulty'],
                duration=workout_data['duration'],
                calories_estimate=workout_data['calories_estimate'],
                created_at=timezone.now()
            )

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
        self.stdout.write(f'Created {Team.objects.count()} teams')
        self.stdout.write(f'Created {User.objects.count()} users')
        self.stdout.write(f'Created {Activity.objects.count()} activities')
        self.stdout.write(f'Created {Leaderboard.objects.count()} leaderboard entries')
        self.stdout.write(f'Created {Workout.objects.count()} workouts')
