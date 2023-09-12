using API2.Models.Dto.Staff;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API2.Models.Validation.Staff
{
    public class DetailStaffDtoValidation : AbstractValidator<DetailStaffDto>
    {
        public DetailStaffDtoValidation()
        {
            RuleFor(x => x.FullName).NotNull().WithMessage("FullName cannot be null or empty").NotEmpty().WithMessage("FullName cannot be null or empty")
              .MaximumLength(250).WithMessage("FullName'length cannot be more than 250 letters").MinimumLength(2).WithMessage("FullName'length cannot be less than 2 letters");
            RuleFor(x => x.ShortName).NotNull().WithMessage("ShortName cannot be null or empty").NotEmpty().WithMessage("ShortName cannot be null or empty")
            .MaximumLength(250).WithMessage("FullName'length cannot be more than 250 letters").MinimumLength(2).WithMessage("FullName'length cannot be less than 2 letters");
        }
    }
}