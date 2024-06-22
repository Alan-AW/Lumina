from django.db import models


# 企业表
class Company(models.Model):
    name = models.CharField(max_length=64, unique=True, verbose_name='企业名称')
    address = models.CharField(max_length=255, null=True, blank=True, verbose_name='企业地址')
    legal_rep = models.CharField(max_length=8, null=True, blank=True, verbose_name='企业法人')
    tel = models.CharField(max_length=14, null=True, blank=True, verbose_name='联系电话')
    email = models.CharField(max_length=64, null=True, blank=True, verbose_name='企业邮箱')

    def logo_upload_path(self, instance):
        return f'companyLogo/{self.name}/{instance}'

    logo = models.ImageField(
        upload_to=logo_upload_path, null=True, blank=True, verbose_name='企业logo'
    )
    allow_cultivars = models.ManyToManyField(to='Cultivar', verbose_name='允许种植的品类')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'company'
        verbose_name = '企业管理'

    def __str__(self):
        return f'{self.name}'


"""
# 区域表-好像无用了-2024-1-3确定删除该表
class Zone(models.Model):
    name = models.CharField(max_length=64, unique=True, verbose_name='区域名称')
    company = models.ForeignKey(
        to=Company, to_field='id', on_delete=models.CASCADE, related_name='zones', verbose_name='所属企业'
    )
    status = models.IntegerField(choices=((0, '禁用'), (1, '正常')), verbose_name='区域状态', default=1)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    time_zone = models.CharField(max_length=32, verbose_name='时区码')

    class Meta:
        db_table = 'zone'
        verbose_name = '区域管理'

    def __str__(self):
        return f'{self.name}'
"""


# 房间表
class Room(models.Model):
    company = models.ForeignKey(
        to=Company, to_field='id', on_delete=models.CASCADE, null=True, blank=True,
        related_name='rooms', verbose_name='所属公司'
    )
    serial_number = models.CharField(max_length=255, verbose_name='房间编号')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'room'
        verbose_name = '房间管理'

    def __str__(self):
        return f'{self.serial_number}'


# 机器设备表
class Unit(models.Model):
    room = models.ForeignKey(
        to=Room, to_field='id', on_delete=models.CASCADE, related_name='units', verbose_name='所属房间'
    )
    serial_number = models.CharField(max_length=255, null=True, blank=True, verbose_name='机器昵称')
    deviceId = models.CharField(max_length=255, unique=True, verbose_name='设备ID')
    deviceSecret = models.CharField(max_length=255, verbose_name='设备密钥')
    status = models.IntegerField(choices=((0, '禁用'), (1, '正常')), verbose_name='机器状态', default=1)
    ping = models.CharField(max_length=64, null=True, blank=True, verbose_name='逻辑核心上一次ping的时间')
    camera_link = models.TextField(null=True, blank=True, verbose_name='摄像头链接')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'unit'
        verbose_name = '机器管理'

    def __str__(self):
        return f'{self.serial_number}-{self.deviceId}'


# 设备功能值管理表
class UnitSetting(models.Model):
    unit = models.ForeignKey(
        to='Unit', to_field='id', on_delete=models.CASCADE, related_name='settings', verbose_name='设备名称'
    )
    cmd = models.ForeignKey(
        to='UnitSettingsList', to_field='id', on_delete=models.CASCADE, related_name='unit_set', verbose_name='设置名称'
    )
    auto = models.BooleanField(default=True, verbose_name='是否自动')
    value = models.CharField(max_length=255, verbose_name='设置值')

    class Meta:
        db_table = 'unit_setting'
        verbose_name = '机器设置'
        unique_together = ('unit', 'cmd')
        ordering = ('cmd',)

    def __str__(self):
        return f'{self.unit.serial_number}-{self.cmd.cmd}'


# 机器设备所支持的功能
class UnitSettingsList(models.Model):
    cmd = models.CharField(max_length=64, unique=True, verbose_name='指令名称')
    desc_cn = models.CharField(max_length=64, verbose_name='中文解释')
    desc_en = models.CharField(max_length=64, verbose_name='英文解释')
    category_cn = models.IntegerField(null=True, blank=True, choices=(
        (1, '营养液及灌溉'),
        (2, '日夜周期'),
        (3, '气候控制'),
        (4, '光合作用'),
        (5, '系统设备'),
    ), verbose_name='中文分类')
    category_en = models.IntegerField(null=True, blank=True, choices=(
        (1, 'Fertigation'),
        (2, 'Day-Night Cycle'),
        (3, 'Climate Control'),
        (4, 'Photosynthesis'),
        (5, 'System'),
    ), verbose_name='英文分类')
    component = models.IntegerField(choices=((1, 'slide'), (2, 'switch')), default=1, verbose_name='组件类型')
    min_value = models.CharField(max_length=8, null=True, blank=True, verbose_name='最小值')
    max_value = models.CharField(max_length=8, null=True, blank=True, verbose_name='最大值')
    step = models.CharField(max_length=8, null=True, blank=True, verbose_name='调整区间')
    unit_cn = models.CharField(max_length=16, null=True, blank=True, verbose_name='中文单位')
    unit_en = models.CharField(max_length=16, null=True, blank=True, verbose_name='英文单位')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'unit_settings_list'
        verbose_name = 'APP参数设置'
        ordering = ('id',)

    def __str__(self):
        return self.cmd


# 2024-2-4新增品类表，该表实际是用户可种植蔬菜表,与下面的算法多对多关联在控制台进行配置每个品类支持的算法集
class Cultivar(models.Model):
    icon = models.CharField(max_length=255, verbose_name='品类图标')
    name_cn = models.CharField(max_length=64, verbose_name='中文名称')
    name_en = models.CharField(max_length=64, verbose_name='英文名称')
    desc_cn = models.CharField(max_length=255, verbose_name='中文描述')
    desc_en = models.CharField(max_length=255, verbose_name='英文描述')
    cycle = models.IntegerField(default=1, verbose_name='种植周期')
    algorithm = models.ManyToManyField(to='Algorithm', verbose_name='算法集默认值')
    remark = models.TextField(null=True, blank=True, verbose_name='备注')

    class Meta:
        db_table = 'cultivar'
        verbose_name = '种植品类'
        ordering = ('-id',)

    def __str__(self):
        return f'{self.name_cn}-{self.name_en}'


# 2024-2-4新增品类算法表，该表为固定字段内容，供用户选择种植品类的个性化指令
# 24-6-10该表不用于控制具体的算法，将算法交给公司管理员编辑，暂保留cmd字段作为默认值提供
class Algorithm(models.Model):
    subject_cn = models.CharField(max_length=64, verbose_name='算法主题cn')
    subject_en = models.CharField(max_length=64, verbose_name='算法主题en')
    title_cn = models.CharField(max_length=64, verbose_name='算法标题cn')
    title_en = models.CharField(max_length=64, verbose_name='算法标题en')
    desc_cn = models.CharField(max_length=255, verbose_name='算法描述cn')
    desc_en = models.CharField(max_length=255, verbose_name='算法描述en')
    choices_cn = models.JSONField(default=list, verbose_name='算法选项cn')
    choices_en = models.JSONField(default=list, verbose_name='算法选项en')
    choices_self = models.BooleanField(default=False, verbose_name='自定义选项,APP端用于分辨是否有子集的字段')
    cmd = models.JSONField(default=dict, verbose_name='算法指令集')
    app_show = models.BooleanField(default=True, verbose_name='是否显示在APP')
    push = models.BooleanField(default=True, verbose_name='是否推送')

    class Meta:
        db_table = 'algorithm'
        verbose_name = '种植品类算法'
        ordering = ('-id',)

    def __str__(self):
        return f'{self.subject_cn}-{self.title_cn}'


# 24-6-10新增公司的品类算法控制表
class CompanyCultivarAlgorithm(models.Model):
    company = models.ForeignKey(to=Company, on_delete=models.CASCADE, verbose_name='公司')
    cultivar = models.ForeignKey(to=Cultivar, on_delete=models.CASCADE, verbose_name='种植品类')
    algorithm = models.ForeignKey(
        to=Algorithm, on_delete=models.CASCADE, null=True, blank=True, default=None,
        related_name='company_algorithm', verbose_name='对应算法'
    )
    cmd = models.JSONField(default=dict, verbose_name='算法指令集')

    class Meta:
        db_table = 'company_cultivar_algorithm'
        verbose_name = '公司品类算法'
        ordering = ('-id',)

    def __str__(self):
        return f'{self.company}-{self.cultivar}'


# 设备作物详情表
class UnitPlantDesc(models.Model):
    unit = models.ForeignKey(
        to=Unit, to_field='id', related_name='plant_desc', on_delete=models.CASCADE, verbose_name='设备'
    )
    cultivar = models.ForeignKey(to=Cultivar, on_delete=models.CASCADE, verbose_name='种植品类')
    algorithm = models.JSONField(default=list, blank=True, verbose_name='算法指令集')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='种植时间')
    status = models.BooleanField(default=True, verbose_name='周期状态')

    class Meta:
        db_table = 'unit_plant_desc'
        verbose_name = '作物详情'

    def __str__(self):
        return self.unit.deviceId


cultivarAlgorithmTable = [
    {'subject_cn': '种植⽬标', 'subject_en': 'Grow Objectives', 'title_cn': '⽣⻓速度', 'title_en': 'Growth Speed',
     'desc_cn': '说明', 'desc_en': 'Description', 'choices_cn': ['正常', '加速', '放缓'],
     'choices_en': ['Regular', 'Sped Up', 'Slowed Down'], 'cmd': [], 'app_show': True},
    {'subject_cn': '种植⽬标', 'subject_en': 'Grow Objectives', 'title_cn': '次⽣代谢物',
     'title_en': 'Secondary Metabolites', 'desc_cn': '说明', 'desc_en': 'Description', 'choices_cn': ['正常', '更多'],
     'choices_en': ['Regular', 'More'], 'cmd': [], 'app_show': True},
    {'subject_cn': '种植⽬标', 'subject_en': 'Grow Objectives', 'title_cn': '产物⼤⼩', 'title_en': 'Produce Size',
     'desc_cn': '说明', 'desc_en': 'Description', 'choices_cn': ['正常', '更大', '偏小'],
     'choices_en': ['Regular', 'Larger', 'Smaller'], 'cmd': [], 'app_show': True},
    {'subject_cn': '种植⽬标', 'subject_en': 'Grow Objectives', 'title_cn': '有效成分',
     'title_en': 'Phytochemical Composition', 'desc_cn': '说明', 'desc_en': 'Description',
     'choices_cn': ['正常', '更多'], 'choices_en': ['Regular', 'More'], 'cmd': [], 'app_show': True},
    {'subject_cn': '种植⽬标', 'subject_en': 'Grow Objectives', 'title_cn': '⼝味组成', 'title_en': 'Flavour',
     'desc_cn': '说明', 'desc_en': 'Description', 'choices_cn': ['正常', '偏甜', '偏酸'],
     'choices_en': ['Regular', 'Sweeter', 'More Sour'], 'cmd': [], 'app_show': True},
    {'subject_cn': '种植⽬标', 'subject_en': 'Grow Objectives', 'title_cn': '⼝感组成', 'title_en': 'Texture',
     'desc_cn': '说明', 'desc_en': 'Description', 'choices_cn': ['正常', '偏嫩', '偏脆'],
     'choices_en': ['Regular', 'More Tender', 'Crunchier'], 'cmd': [], 'app_show': True},
    {'subject_cn': '种植技巧', 'subject_en': 'Grow Techniques', 'title_cn': '⾃动紫外线⾍害消杀',
     'title_en': 'Auto UV Disinfection', 'desc_cn': '⾃动紫外线⾍害消杀', 'desc_en': 'Auto UV Disinfection',
     'choices_cn': ['开', '关'], 'choices_en': ['on', 'off'], 'cmd': [], 'app_show': True},
    {'subject_cn': '种植技巧', 'subject_en': 'Grow Techniques', 'title_cn': '⾃动防治绿藻', 'title_en': 'Auto Algae',
     'desc_cn': '⾃动防治绿藻', 'desc_en': 'Auto Algae', 'choices_cn': ['开', '关'], 'choices_en': ['on', 'off'],
     'cmd': [], 'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '催芽', 'title_en': 'Germination', 'desc_cn': '催芽',
     'desc_en': 'Germination', 'choices_cn': [], 'choices_en': [], 'cmd': [], 'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '缓苗期', 'title_en': 'Transplant Recovery',
     'desc_cn': '缓苗期', 'desc_en': 'Transplant Recovery', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '育苗', 'title_en': 'Seedling', 'desc_cn': '育苗',
     'desc_en': 'Seedling', 'choices_cn': [], 'choices_en': [], 'cmd': [], 'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '营养⽣⻓-早期', 'title_en': 'Early Vegetative',
     'desc_cn': '营养⽣⻓-早期', 'desc_en': 'Early Vegetative', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '营养⽣⻓-中期', 'title_en': 'Mid Vegetative',
     'desc_cn': '营养⽣⻓-中期', 'desc_en': 'Mid Vegetative', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '营养⽣⻓-后期', 'title_en': 'Late Vegetative',
     'desc_cn': '营养⽣⻓-后期', 'desc_en': 'Late Vegetative', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '花期-早期', 'title_en': 'Early Flowering',
     'desc_cn': '花期-早期', 'desc_en': 'Early Flowering', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '花期-中期', 'title_en': 'Mid Flowering',
     'desc_cn': '花期-中期', 'desc_en': 'Mid Flowering', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '花期-后期', 'title_en': 'Late Flowering',
     'desc_cn': '花期-后期', 'desc_en': 'Late Flowering', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '结果期-早期', 'title_en': 'Early Flowering',
     'desc_cn': '结果期-早期', 'desc_en': 'Early Flowering', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '结果期-中期', 'title_en': 'Mid Fruiting',
     'desc_cn': '结果期-中期', 'desc_en': 'Mid Fruiting', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '结果期-晚期', 'title_en': 'Late Fruiting',
     'desc_cn': '结果期-晚期', 'desc_en': 'Late Fruiting', 'choices_cn': [], 'choices_en': [], 'cmd': [],
     'app_show': True},
    {'subject_cn': '⽣⻓阶段', 'subject_en': 'Phases', 'title_cn': '越冬期', 'title_en': 'Wintering', 'desc_cn': '越冬期',
     'desc_en': 'Wintering', 'choices_cn': [], 'choices_en': [], 'cmd': [], 'app_show': True},
]


# 房间详情传感器-业务系统第二期已弃用该表，暂保留该实体表
class RoomDesc(models.Model):
    room = models.OneToOneField(to=Room, to_field='id', on_delete=models.CASCADE, verbose_name='所属房间')
    json_val = models.JSONField(verbose_name='房间时刻详情')

    class Meta:
        db_table = 'room_desc'
        verbose_name = '房间详情'

    def __str__(self):
        return self.room.serial_number


# 温度传感器
class Temperature(models.Model):
    """
    温度的 就是  字段就是 deviceId，deviceSecret ，val就可以了
    "thermal_reading": [19.5, 20.3, 20.7, 23.1, ...]
    """
    moment = models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')
    deviceId = models.CharField(max_length=512, verbose_name='机器实体编号')
    deviceSecret = models.CharField(max_length=512, verbose_name='机器实体编号2')
    json_val = models.JSONField(verbose_name='传感器温度值(json列表串)')

    class Meta:
        db_table = 'temperature'
        verbose_name = '温度传感器'

    def __str__(self):
        return self.deviceId


# 水肥传感器
class Fertilizer(models.Model):
    """
    水肥系统的字段 deviceId，deviceSecret， val
    val 的格式就是  {"Lighting":{"xxx":"xxx","xxx","xxx"},"Irrigation":{"xx":"xx","xx","xx"}}
    """
    moment = models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')
    deviceId = models.CharField(max_length=512, verbose_name='机器实体编号')
    deviceSecret = models.CharField(max_length=512, verbose_name='机器实体编号2')
    json_val = models.JSONField(verbose_name='传感器值(json字典串)')

    class Meta:
        db_table = 'fertilizer'
        verbose_name = '水肥传感器'

    def __str__(self):
        return self.deviceId


# 光照传感器
class Lighting(models.Model):
    """
    {"Lighting":{"key":"value","key":"value"},"Irrigation":{"key":"value"}}
    """
    moment = models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')
    deviceId = models.CharField(max_length=512, verbose_name='机器实体编号')
    deviceSecret = models.CharField(max_length=512, verbose_name='机器实体编号2')
    json_val = models.JSONField(verbose_name='传感器值(json字典串)')

    class Meta:
        db_table = 'lighting'
        verbose_name = '光照传感器'

    def __str__(self):
        return self.deviceId


# 以下 Species - HardwareOptions为第二期开发的树结构数据表模型
class Species(models.Model):
    name_en = models.CharField(max_length=64, verbose_name='英文名')
    name_cn = models.CharField(max_length=64, verbose_name='中文名')
    description_en = models.CharField(max_length=64, verbose_name='英文描述')
    description_cn = models.CharField(max_length=64, verbose_name='中文描述')

    class Meta:
        db_table = 'species'
        verbose_name = '顶层species'

    def __str__(self):
        return self.name_cn


class Cultivars(models.Model):
    species = models.ForeignKey(
        to=Species, related_name='cultivars', to_field='id', on_delete=models.CASCADE, verbose_name='所属上层'
    )
    name_en = models.CharField(max_length=64, verbose_name='英文名')
    name_cn = models.CharField(max_length=64, verbose_name='中文名')
    description_en = models.CharField(max_length=64, verbose_name='英文描述')
    description_cn = models.CharField(max_length=64, verbose_name='中文描述')

    class Meta:
        db_table = 'cultivars'
        verbose_name = '第一层cultivars'

    def __str__(self):
        return self.name_cn


class Models(models.Model):
    cultivars = models.ForeignKey(
        to=Cultivars, related_name='models', on_delete=models.CASCADE, verbose_name='所属上层'
    )
    name_en = models.CharField(max_length=64, verbose_name='英文名')
    name_cn = models.CharField(max_length=64, verbose_name='中文名')
    description_en = models.CharField(max_length=64, verbose_name='英文描述')
    description_cn = models.CharField(max_length=64, verbose_name='中文描述')
    available_grow_objectives = models.JSONField(null=True, default=list)
    available_grow_techniques = models.JSONField(null=True, default=list)

    class Meta:
        db_table = 'models'
        verbose_name = '第二层models'

    def __str__(self):
        return self.name_cn


class Phases(models.Model):
    phase_index = models.IntegerField(default=0)
    f_model = models.ForeignKey(
        to=Models, related_name='phases', on_delete=models.CASCADE, verbose_name='所属上层'
    )
    name_en = models.CharField(max_length=64, verbose_name='英文名')
    name_cn = models.CharField(max_length=64, verbose_name='中文名')
    description_en = models.CharField(max_length=64, verbose_name='英文描述')
    description_cn = models.CharField(max_length=64, verbose_name='中文描述')
    scheduled_events = models.JSONField(null=True, blank=True, default=list)
    ending_condition = models.CharField(max_length=16, default='any', verbose_name='任何或所有')
    ending_triggers = models.JSONField(null=True, blank=True, default=list)

    class Meta:
        db_table = 'phases'
        verbose_name = '第三层phases'

    def __str__(self):
        return self.name_cn


class Instruction(models.Model):
    phases = models.ForeignKey(to=Phases, related_name='base', on_delete=models.CASCADE, verbose_name='所属上层')
    status = models.CharField(max_length=64, default='active')
    type = models.CharField(max_length=64, default='timed')
    # if type is timed
    n_weeks = models.IntegerField(null=True, blank=True, verbose_name='每隔n周')
    dow = models.JSONField(null=True, blank=True, default=list, verbose_name='事件发生在一周中的哪一天[]')
    tod = models.TimeField(null=True, blank=True)
    # if type is interval
    interval = models.TimeField(null=True, blank=True)
    duration = models.TimeField(null=True, blank=True)

    class Meta:
        db_table = 'instruction'
        verbose_name = '第四层instruction'

    def __str__(self):
        return self.type


class Action(models.Model):
    base = models.ForeignKey(
        to=Instruction, related_name='action', on_delete=models.CASCADE, verbose_name='所属上层'
    )
    snippet_type = models.CharField(max_length=64, default='action')
    status = models.CharField(max_length=64, default='active')
    type = models.CharField(max_length=64, default='no_feedback')
    hardware = models.CharField(max_length=64, default='growLED')
    environmental_factor = models.CharField(max_length=64, default='temperature')
    instruction = models.CharField(max_length=64, default='turn_on')
    value = models.JSONField(null=True, blank=True, default=list)
    curve = models.CharField(max_length=64, default='linear')
    curve_duration = models.TimeField(null=True, blank=True, default='00:30:00')

    class Meta:
        db_table = 'action'
        verbose_name = '第五层action'

    def __str__(self):
        return self.snippet_type


class Triggers(models.Model):
    phases = models.ForeignKey(
        to=Phases, related_name='triggers', to_field='id', on_delete=models.CASCADE, verbose_name='所属上级'
    )
    name_en = models.CharField(max_length=64, verbose_name='英文名')
    name_cn = models.CharField(max_length=64, verbose_name='中文名')
    status = models.CharField(max_length=64, default='active')
    triggered = models.BooleanField(default=False, verbose_name='布尔值')
    type = models.CharField(max_length=64, default='exception')
    metric = models.ForeignKey(
        to='EnvironmentalOptions', to_field='value', null=True, blank=True, on_delete=models.SET_NULL
    )
    operator = models.CharField(max_length=64, default='greater_than')
    threshold = models.IntegerField(default=20)
    # when type == "exception" all this is null
    # when type == "trend" all this is full
    # when type == "rate" just have direction and timeframe
    direction = models.CharField(null=True, blank=True, max_length=64)
    timeframe = models.TimeField(null=True, blank=True, default=None)
    toi = models.TimeField(null=True, blank=True, default=None)

    class Meta:
        db_table = 'triggers'
        verbose_name = '第六层triggers'

    def __str__(self):
        return self.name_cn


class EnvironmentalOptions(models.Model):
    label = models.CharField(max_length=64, verbose_name='key')
    value = models.CharField(max_length=64, verbose_name='value', unique=True)

    class Meta:
        db_table = 'environmental_options'
        verbose_name = 'options'

    def __str__(self):
        return self.label


class HardwareOptions(models.Model):
    label = models.CharField(max_length=64, verbose_name='key')
    value = models.CharField(max_length=64, verbose_name='value')

    class Meta:
        db_table = 'hardware_options'
        verbose_name = 'options'

    def __str__(self):
        return self.label
