import { TestBed, inject } from '@angular/core/testing';

import { JoinRoomService } from './join-room.service';

describe('JoinRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoinRoomService]
    });
  });

  it('should be created', inject([JoinRoomService], (service: JoinRoomService) => {
    expect(service).toBeTruthy();
  }));
});
