<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Site;
use Faker\Factory as Faker;
class SitesTableSeeder extends Seeder {
	public function run()
	{
		$faker = Faker::create('en_GB');
		$sites = [
			['The Hastings Academy', 'abc' '0098c3', 'primary'],
			['The St Leonards Academy', 'dfg', '47068c', 'secondary']
		];
		foreach(range(1,count($sites)) as $index)
		{
			$site = Site::create([
				'name' => $sites[$index - 1][0],
				'slug' => $sites[$index - 1][1],
				'hex_color' => $sites[$index - 1][3],
				'type' => $sites[$index - 1][4]
			]);

			$site->groups()->create([
				'name' => $sites[$index - 1][0],
				'open' => 1,
				'service_provider' => 0,
				'default' => 1,
			]);
		}
	}
}
