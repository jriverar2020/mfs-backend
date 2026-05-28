import {PartialType} from '@nestjs/mapped-types';
import {CreatePanCocoDto} from './create-pan-coco.dto';

export class UpdatePanCocoDto extends PartialType(CreatePanCocoDto){
    
}