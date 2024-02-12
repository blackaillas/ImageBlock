import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockComponent } from './block.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BlockComponent', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BlockComponent, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate width and height correctly width defaults values', () => {
    expect(component.getSizeAsCssStyle()).toEqual('width: 160px; height: 160px');
  });

  it('should calculate width and height correctly when size is too low (lower than 1)', () => {
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: 200px; height: 200px');
    component.size = 40;
    expect(component.getSizeAsCssStyle()).toEqual('width: 40px; height: 40px');
    component.size = 0;
    expect(component.getSizeAsCssStyle()).toEqual('width: 160px; height: 160px');
    component.size = -1;
    expect(component.getSizeAsCssStyle()).toEqual('width: 160px; height: 160px');
    component.size = 7;
    expect(component.getSizeAsCssStyle()).toEqual('width: 7px; height: 7px');
    component.size = 8;
    expect(component.getSizeAsCssStyle()).toEqual('width: 8px; height: 8px');
    component.size = 10;
    expect(component.getSizeAsCssStyle()).toEqual('width: 10px; height: 10px');
  });

  it('should calculate width and height correctly when level increases', () => {
    component.level = 1;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: 200px; height: 200px');
    component.level = 2;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: 98px; height: 98px');
    component.level = 3;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: 47px; height: 47px');
    component.level = 4;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: 21.5px; height: 21.5px');
  });
});