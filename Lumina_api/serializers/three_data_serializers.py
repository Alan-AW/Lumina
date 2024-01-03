from rest_framework import serializers
from operations.models import Species, Cultivars, Models, Phases, Instruction, Action, Triggers, EnvironmentalOptions, \
    Company


class SpeciesDataSer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'


class CultivarsDataSer(serializers.ModelSerializer):
    class Meta:
        model = Cultivars
        fields = '__all__'


class ModelsDataSer(serializers.ModelSerializer):
    class Meta:
        model = Models
        fields = '__all__'


class PhasesDataSer(serializers.ModelSerializer):
    class Meta:
        model = Phases
        fields = '__all__'


class InstructionDataSer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = '__all__'


class ActionDataSer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'


class TriggersDataSer(serializers.ModelSerializer):
    class Meta:
        model = Triggers
        fields = '__all__'


class EnvironmentalOptionsChoicesSer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalOptions
        fields = ['label', 'value']


class ChoicesCompanySer(serializers.ModelSerializer):
    label = serializers.CharField(source='name')
    value = serializers.IntegerField(source='id')

    class Meta:
        model = Company
        fields = ['label', 'value']
