import { TestBed, inject } from '@angular/core/testing';

import { ScrumPlanningService } from './scrum-planning.service';

describe('ScrumPlanningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrumPlanningService]
    });
  });

  it('should be created', inject([ScrumPlanningService], (service: ScrumPlanningService) => {
    expect(service).toBeTruthy();
  }));
});
