package com.web.serviceimp;

import com.web.entity.Welfare;
import com.web.exception.MessageException;
import com.web.repository.WelfareRepository;
import com.web.service.WelfareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WelfareServiceImp implements WelfareService {

    @Autowired
    private WelfareRepository welfareRepository;

    @Override
    public Welfare saveOrUpdate(Welfare welfare) {
        Welfare result = welfareRepository.save(welfare);
        return result;
    }

    @Override
    public void delete(Long id) {
        try {
            welfareRepository.deleteById(id);
        }
        catch (Exception e){
            throw new MessageException("Không thể xóa phúc lợi này");
        }
    }

    @Override
    public Welfare findById(Long id) {
        return welfareRepository.findById(id).get();
    }

    @Override
    public List<Welfare> findAll() {
        return welfareRepository.findAll();
    }
}
