from __future__ import unicode_literals
from django.db import models

# from django.contrib.auth.models import User

class student_info(models.Model):
	first_name = models.CharField(max_length = 100)
	second_name = models.CharField(max_length = 100)
	date_birth = models.DateTimeField(auto_now=False, auto_now_add=True)
	admin_no = models.CharField(max_length=10, unique = True)
	telephone = models.CharField(max_length = 20)
	# User = models.ForeignKey('User', on_delete=models.CASCADE,)

	def __unicode__(self):
		return self.Title

