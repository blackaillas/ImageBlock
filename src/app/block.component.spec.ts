import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockComponent } from '../../projects/image-quad/src/lib/block.component';
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
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
  });

  it('should calculate width and height correctly when size is too low (lower than gap*2)', () => {
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(200px - 0px); height: calc(200px - 0px)');
    component.size = 40;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(40px - 0px); height: calc(40px - 0px)');
    component.size = 0;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
    component.size = -1;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
    component.size = 7;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
    component.size = 8;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
    component.size = 10;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(10px - 0px); height: calc(10px - 0px)');
  });

  it('should calculate width and height correctly when size is too low (lower than gap*2) and gap is custom', () => {
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(200px - 0px); height: calc(200px - 0px)');
    component.size = 40;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(40px - 0px); height: calc(40px - 0px)');
    component.size = 0;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
    component.size = -1;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
    component.gap = 1;
    component.size = 8;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(8px - 0px); height: calc(8px - 0px)');
    component.gap = 10;
    component.size = 10;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(160px - 0px); height: calc(160px - 0px)');
  });

  it('should calculate width and height correctly when level increases', () => {
    component.level = 1;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(200px - 0px); height: calc(200px - 0px)');
    component.level = 2;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(100px - 2px); height: calc(100px - 2px)');
    component.level = 3;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(50px - 4px); height: calc(50px - 4px)');
    component.level = 4;
    component.gap = 4;
    component.size = 200;
    expect(component.getSizeAsCssStyle()).toEqual('width: calc(25px - 6px); height: calc(25px - 6px)');
  });
});