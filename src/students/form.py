from django import forms
from .models import student_info

class studentform(forms.ModelForm):
	first_name = forms.CharField()
	last_name = forms.CharField()
	date_birth = forms.DateTimeField
	admin_no = forms.CharField()
	telephone = forms.CharField()

class meta:
	model = student_info
	fields =  ["first_name",
		"second_name",
		"date_birth",
		"admin_no",
		"telephone",
	]