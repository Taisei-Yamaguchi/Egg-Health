from __future__ import absolute_import, unicode_literals

# Celeryアプリケーションをインポートして使用可能にする
from .celery import app as celery_app

__all__ = ('celery_app',)
