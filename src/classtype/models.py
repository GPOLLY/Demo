from __future__ import unicode_literals

from django.db import models

class classtype(models.Model):
	class_name = models.CharField(max_length = 20)
	stream =models.CharField(max_length = 30)

	def __unicode__(self):
		return self.Title

