from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(read_only=True)
    
    class Meta:
        model = User
        fields = ['_id', 'name', 'email', 'password', 'team_id', 'created_at']
        extra_kwargs = {'password': {'write_only': True}}


class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Team
        fields = ['_id', 'name', 'description', 'created_at']


class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Activity
        fields = ['_id', 'user_id', 'activity_type', 'duration', 'calories_burned', 'distance', 'date', 'notes']


class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = ['_id', 'user_id', 'team_id', 'total_calories', 'total_activities', 'total_distance', 'rank', 'last_updated']


class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'activity_type', 'difficulty', 'duration', 'calories_estimate', 'created_at']
