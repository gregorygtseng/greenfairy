var greenFairy = {
    getWindowLocation: function () {
        var self = this;
        chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
            var currentTab = tabs[0];
            var parseUrl = tabs[0].url;
            var host = self.parseUri(parseUrl);
            var xmlhttp = new XMLHttpRequest();
            var apiUrl = "http://api.climatecounts.org/1/Companies.json?IncludeBrands=True&IncludeScores=True&StartsWith=True&Search=" + host;

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var parsedJSON = JSON.parse(xmlhttp.responseText);
                    self.getScores(parsedJSON, host);
                } else {
                    // alert("error with api?");
                }
            }

            xmlhttp.open("GET", apiUrl, true);
            xmlhttp.send();
        });
    },
    climateCountsApi: {

    },
    setCompanyName: function(name) {
        var names = document.getElementsByClassName("CompanyDomain");
        var x;
        for (x in names) {
            names[x].innerText = name;
        }
    },
    setScore: function(score) {
        document.getElementsByClassName("CompanyScore")[0].innerText = score;
    },
    getScores: function(parsedJSON, host, currentTab) {
        if (parsedJSON == undefined) {
            document.getElementsByTagName("body")[0].innerText = "No score found for " + host + ".. \n\n  WE NEED TO FIX THIS!!!";
            return
        }
        this.responseJSON = parsedJSON;

        if (parsedJSON.Companies.length > 1) {
            var re = new RegExp( host, "i");
            var x;

            for (x in parsedJSON.Companies) {
                if (parsedJSON.Companies[x].Name.match(re)) {
                    this.setCompanyName(parsedJSON.Companies[x].Name);
                    this.setScore(parsedJSON.Companies[x].Scores.Scores[0].Total);
                }
            }
        } else {
            this.setCompanyName(parsedJSON.Companies[0].Name);
            var score = parsedJSON.Companies[0].Scores.Scores[0].Total;
            this.setScore(score);
            chrome.browserAction.setBadgeText({text: score.toString()});
        }
    },
    parseUri: function(url) {
        var parser = document.createElement('a');
        parser.href = url;
        var u = parser.hostname.split('.');
        return this.removeTlds(u);
    },
    removeTlds: function(components) {
        var x, y, z;
        var tldList = this.tldList;
        var removeThese = [];
        for (x in components) {
            for (y in tldList) {
                if (components[x] == tldList[y] ) {
                    removeThese.unshift(x);
                }
            }
        }
        for (z in removeThese) {
            components.splice(removeThese[z], 1)
        }
        return components[components.length - 1]
    },
    // https://data.iana.org/TLD/tlds-alpha-by-domain.txt
    tldList: [ "ac","academy","accountants","active","actor","ad","ae","aero","af","ag","agency","ai","airforce","al","am","an","ao","aq","ar","archi","army","arpa","as","asia","associates","at","attorney","au","auction","audio","autos","aw","ax","axa","az","ba","bar","bargains","bayern","bb","bd","be","beer","berlin","best","bf","bg","bh","bi","bid","bike","bio","biz","bj","black","blackfriday","blue","bm","bmw","bn","bnpparibas","bo","boo","boutique","br","brussels","bs","bt","build","builders","business","buzz","bv","bw","by","bz","bzh","ca","cab","camera","camp","cancerresearch","capetown","capital","caravan","cards","care","career","careers","cash","cat","catering","cc","cd","center","ceo","cern","cf","cg","ch","cheap","christmas","church","ci","citic","city","ck","cl","claims","cleaning","click","clinic","clothing","club","cm","cn","co","codes","coffee","college","cologne","com","community","company","computer","condos","construction","consulting","contractors","cooking","cool","coop","country","cr","credit","creditcard","cruises","cu","cuisinella","cv","cw","cx","cy","cymru","cz","dad","dance","dating","day","de","deals","degree","democrat","dental","dentist","desi","diamonds","diet","digital","direct","directory","discount","dj","dk","dm","dnp","do","domains","durban","dz","eat","ec","edu","education","ee","eg","email","engineer","engineering","enterprises","equipment","er","es","esq","estate","et","eu","eus","events","exchange","expert","exposed","fail","farm","feedback","fi","finance","financial","fish","fishing","fitness","fj","fk","flights","florist","fm","fo","foo","foundation","fr","frl","frogans","fund","furniture","futbol","ga","gal","gallery","gb","gbiz","gd","ge","gent","gf","gg","gh","gi","gift","gifts","gives","gl","glass","global","globo","gm","gmail","gmo","gmx","gn","gop","gov","gp","gq","gr","graphics","gratis","green","gripe","gs","gt","gu","guide","guitars","guru","gw","gy","hamburg","haus","healthcare","help","here","hiphop","hiv","hk","hm","hn","holdings","holiday","homes","horse","host","hosting","house","how","hr","ht","hu","id","ie","il","im","immo","immobilien","in","industries","info","ing","ink","institute","insure","int","international","investments","io","iq","ir","is","it","je","jetzt","jm","jo","jobs","joburg","jp","juegos","kaufen","ke","kg","kh","ki","kim","kitchen","kiwi","km","kn","koeln","kp","kr","krd","kred","kw","ky","kz","la","lacaixa","land","lawyer","lb","lc","lease","lgbt","li","life","lighting","limited","limo","link","lk","loans","london","lotto","lr","ls","lt","ltda","lu","luxe","luxury","lv","ly","ma","maison","management","mango","market","marketing","mc","md","me","media","meet","melbourne","meme","menu","mg","mh","miami","mil","mini","mk","ml","mm","mn","mo","mobi","moda","moe","monash","mortgage","moscow","motorcycles","mov","mp","mq","mr","ms","mt","mu","museum","mv","mw","mx","my","mz","na","nagoya","name","navy","nc","ne","net","network","neustar","new","nf","ng","ngo","nhk","ni","ninja","nl","no","np","nr","nra","nrw","nu","nyc","nz","okinawa","om","ong","onl","ooo","org","organic","otsuka","ovh","pa","paris","partners","parts","pe","pf","pg","ph","pharmacy","photo","photography","photos","physio","pics","pictures","pink","pizza","pk","pl","place","plumbing","pm","pn","post","pr","praxi","press","pro","prod","productions","properties","property","ps","pt","pub","pw","py","qa","qpon","quebec","re","realtor","recipes","red","rehab","reise","reisen","ren","rentals","repair","report","republican","rest","restaurant","reviews","rich","rio","ro","rocks","rodeo","rs","rsvp","ru","ruhr","rw","ryukyu","sa","saarland","sarl","sb","sc","sca","scb","schmidt","schule","scot","sd","se","services","sexy","sg","sh","shiksha","shoes","si","singles","sj","sk","sl","sm","sn","so","social","software","sohu","solar","solutions","soy","space","spiegel","sr","st","su","supplies","supply","support","surf","surgery","suzuki","sv","sx","sy","systems","sz","tatar","tattoo","tax","tc","td","technology","tel","tf","tg","th","tienda","tips","tirol","tj","tk","tl","tm","tn","to","today","tokyo","tools","top","town","toys","tp","tr","trade","training","travel","tt","tv","tw","tz","ua","ug","uk","university","uno","uol","us","uy","uz","va","vacations","vc","ve","vegas","ventures","versicherung","vet","vg","vi","viajes","villas","vision","vlaanderen","vn","vodka","vote","voting","voto","voyage","vu","wales","wang","watch","webcam","website","wed","wf","whoswho","wien","wiki","williamhill","wme","works","ws","wtc","wtf","xn--1qqw23a","xn--3bst00m","xn--3ds443g","xn--3e0b707e","xn--45brj9c","xn--4gbrim","xn--55qw42g","xn--55qx5d","xn--6frz82g","xn--6qq986b3xl","xn--80adxhks","xn--80ao21a","xn--80asehdb","xn--80aswg","xn--90a3ac","xn--c1avg","xn--cg4bki","xn--clchc0ea0b2g2a9gcd","xn--czr694b","xn--czru2d","xn--d1acj3b","xn--fiq228c5hs","xn--fiq64b","xn--fiqs8s","xn--fiqz9s","xn--fpcrj9c3d","xn--fzc2c9e2c","xn--gecrj9c","xn--h2brj9c","xn--i1b6b1a6a2e","xn--io0a7i","xn--j1amh","xn--j6w193g","xn--kprw13d","xn--kpry57d","xn--kput3i","xn--l1acc","xn--lgbbat1ad8j","xn--mgb9awbf","xn--mgba3a4f16a","xn--mgbaam7a8h","xn--mgbab2bd","xn--mgbayh7gpa","xn--mgbbh1a71e","xn--mgbc0a9azcg","xn--mgberp4a5d4ar","xn--mgbx4cd0ab","xn--ngbc5azd","xn--nqv7f","xn--nqv7fs00ema","xn--o3cw4h","xn--ogbpf8fl","xn--p1ai","xn--pgbs0dh","xn--q9jyb4c","xn--rhqv96g","xn--s9brj9c","xn--ses554g","xn--unup4y","xn--vhquv","xn--wgbh1c","xn--wgbl6a","xn--xhq521b","xn--xkc2al3hye2a","xn--xkc2dl3a5ee0h","xn--yfro4i67o","xn--ygbi2ammx","xn--zfr164b","xxx","xyz","yachts","yandex","ye","yokohama","youtube","yt","za","zm","zone","zw" ]
};

document.addEventListener('DOMContentLoaded', function () {
    greenFairy.getWindowLocation();
});
