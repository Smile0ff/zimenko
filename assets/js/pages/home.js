import $ from '@config/jquery';

import Menu from '@components/menu';
import Hold from '@components/hold';
import HeroGallery from '@components/heroGallery';

$(() => {
    new Menu();
    new Hold();
    new HeroGallery();
});