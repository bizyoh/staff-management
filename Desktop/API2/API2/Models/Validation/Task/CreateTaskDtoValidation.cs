using API2.Models.Dto.Staff;
using API2.Models.Dto.Task;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API2.Models.Validation.Staff
{
    public class CreateTaskDtoValidation : AbstractValidator<CreateTaskDto>
    {
        public CreateTaskDtoValidation()
        {
            RuleFor(x => x.Name).NotNull().WithMessage("FullName cannot be null or empty").NotEmpty().WithMessage("FullName cannot be null or empty");
            RuleFor(x => x.Label).NotNull().WithMessage("ShortName cannot be null or empty").NotEmpty().WithMessage("ShortName cannot be null or empty");
        }
    }
}