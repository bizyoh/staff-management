using API2.Models.Dto.Staff;
using API2.Models.Dto.Task;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API2.Models.Validation.Staff
{
    public class DetailTaskDtoValidation : AbstractValidator<DetailTaskDto>
    {
        public DetailTaskDtoValidation()
        {
            RuleFor(x => x.Name).NotNull().WithMessage("Name cannot be null or empty").NotEmpty().WithMessage("Name cannot be null or empty");
            RuleFor(x => x.Label).NotNull().WithMessage("Label cannot be null or empty").NotEmpty().WithMessage("Label cannot be null or empty");
        }
    }
}