from django.shortcuts import render

from .models import student_info
from .form import (student_info, studentform)


def st_info(request):
	
	if request.method == 'POST':
				if request.POST.get('first_name') and request.POST.get('second_name') and request.POST.get('date_birth') and request.POST.get('admin_no') and request.POST.get(telephone):
					post = student_info()
				first_name = request.POST.get('fname', None)
				second_name = request.POST.get('sname', None)	
				date_birth = request.POST.get('dateofbirth', None)
				admin_no = request.POST.get('admission', None)
				telephone = request.POST.get('tel', None)	

				Title = 'STUDENT INFORMATION'

				form = student_info(request.POST)

				# form.save()
				# form = student(request.POST or None, request.FILES or None)

				student_context = {
					'fname': first_name,
					'sname': second_name,
					'dateofbirth': date_birth,
					'admission':admin_no,
					'tel':telephone
				}	
	
				return render(request, 'student.html', student_context)

	else:
				return render(request,'student.html')
						
				
