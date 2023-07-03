from rest_framework.pagination import PageNumberPagination, CursorPagination


# 页码
class NumberPageFunc(PageNumberPagination):
    invalid_page_message = "当前页码无效！"
    page_query_param = 'page'  # get传参获取页码
    page_size = 10  # 每页默认显示数据量
    page_size_query_param = 'size'  # get传参获取到显示条数
    max_page_size = 20  # 每页最大数据显示条数

    def get_paginated_response(self, data):
        return {
            'links': {
                'next': self.get_next_link(),
                'prev': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        }


# 游标
class CursorPageFunc(CursorPagination):
    ordering = '-id'  # 排序规则
    cursor_query_param = 'page'  # get传参指定页码，其实也是返回的链接中的页码
    page_size = 10  # 每页默认显示数量
    page_size_query_param = 'size'  # get传参指定显示条数
    max_page_size = 20  # 分页最大数据显示条数

    def get_paginated_response(self, data):
        return {
            'links': {
                'next': self.get_next_link(),
                'prev': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        }
