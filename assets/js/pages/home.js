import $ from '@config/jquery';

import Loader from '@components/loader';
import HomeContainer from '@containers/homeContainer';

new Loader();

$(() => new HomeContainer());